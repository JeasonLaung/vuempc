export const qs = (name = '') => {
    let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length-1] //获取当前页面的对象
    let options = currentPage.options 
    if(!name){
        return currentPage.options
    }
    else{
        return currentPage.options[name]
    }
}