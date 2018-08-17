const {mysql} = require('../qcloud.js')

module.exports = async(ctx) => {
    const {id} = ctx.request.query
    const detail = await mysql('books')

                        .select('books.*', 'csessioninfo.user_info')
                        // 连表查询，查询条件是'books.openid'等于'csessioninfo.open_id'
                        .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')

                        .where('id', id)
                    //    .frist() // 查询到结果的第一个，如果不写就会以数组的形式返回
    ctx.state.data = detail[0]
    // const info = JSON.parse(detail.user_info)
    // ctx.state.data = Object.assign({}, detail, {
    //     tags: detail.tags.split(','),
    //     summary: detail.summary.split('\n'), // 按换行符分割
    //     user_info: {
    //         nickName: info.nicKName,
    //         image: info.avatarUrl
    //     }
    // })

    await mysql('books')
          .where('id', id)
          .increment('count', 1) // 点击详情页浏览量累加
}
