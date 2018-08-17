const https = require('https')
const {mysql} = require('../qcloud.js')

module.exports = async(ctx) => {
    const {isBook, openid} = ctx.request.body
    if (isBook && openid) {
        const findRes = await mysql('books').select().where('isBook', isBook)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }

        // 去豆瓣获取数据
        let url = 'https://api.douban.com/v2/book/isbn/' + isBook
        const bookinfo = await getJSON(url)
        const rate = bookinfo.rating.average
        const {title, image, alt, publisher, summary, price} = bookinfo
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')

        // 入库
        try {
            await mysql('books').insert({
                isBook, openid, rate, title, image, alt, publisher, summary, price, tags, author
            })
            ctx.state.data = {
                code: 0,
                title,
                msg: 'cuccess'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败:' + e.sqlMessage
                }
            }
        }

        console.log({
            isBook, openid, rate, title, image, alt, publisher, summary, price, tags, author
        })
    }
}

function getJSON (url) {
    return new Promise((reslove, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    reslove(bookinfo)
                }
                reject(bookinfo)
        // urlData += data
            })
        })
    })
}
