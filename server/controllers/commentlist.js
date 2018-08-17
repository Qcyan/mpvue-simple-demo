const {mysql} = require('../qcloud.js')

module.exports = async(ctx) => {
    const {bookid} = ctx.request.query
    const comments = await mysql('comments')
                          .select('comments.*', 'csessioninfo.user_info')
                          .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
                          .where('bookid', bookid)
    console.log('哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈')
    ctx.state.data = comments
    // ctx.state.data = {
    //     list: comments.map(v => {
    //         const info = JSON.parse(v.user_info)
    //         return Object.assign({}, v, {
    //             title: info.nickName,
    //             image: info.avatarUrl
    //         })
    //     })
    // }
}
