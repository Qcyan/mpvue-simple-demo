// const https = require('https')
const {mysql} = require('../qcloud.js')

module.exports = async(ctx) => {
    const {page } = ctx.request.query
    const size = 10

    // 简单的查询
    const book = await mysql('books')
                    .select('*')
                    .limit(size)
                    .offset(Number(page) * size)
                    .orderBy('id', 'desc')
    ctx.state.data = {
        list: book
    }

    // // 连表查询
    // const book = await mysql('books')
    //                 .select('books.*', 'csessioninfo.user_info')
    //                 .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    //                 .limit(size)
    //                 .offset(Number({page} * size))
    //                 .orderBy('books.id', 'desc')  // 排序，从大到小
    // ctx.state.data = {
    //     list: book.map(v => {
    //         const info = JSON.parse(v.user_info)
    //         return Object.assign({}, v, {
    //             user_info: {
    //                 nickName: info.nickName
    //             }
    //         })
    //     })
    // }
}
