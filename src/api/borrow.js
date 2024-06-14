import request from '@/utils/request'

export default {
    getBorrowList(searchModel) {
        return request({
            url: '/borrow/list',
            method: 'get',
            params: {
                pageNo: searchModel.pageNo,
                pageSize: searchModel.pageSize,
                goodsname: searchModel.goodsname,
                username: searchModel.username
            }
        });
    },
    addBorrow(borrow) {
        return request({
            url: '/borrow/add',
            method: 'post',
            data: borrow
        })
    },
    updateBorrow(borrow) {
        return request({
            url: '/borrow/update',
            method: 'put',
            data: borrow
        })
    },
    saveBorrow(borrow) {
        if (borrow.borrowId == null && borrow.borrowId == undefined) {
            return this.addBorrow(borrow);
        }
        return this.updateBorrow(borrow);
    },
    getBorrowById(id) {
        return request({
            url: `/borrow/${id}`,
            method: 'get',
        })
    },
    deleteBorrowById(id) {
        return request({
            url: `/borrow/${id}`,
            method: 'delete',
        })
    },



}
