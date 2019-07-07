/**
 * Created by dell on 2019/4/21.
 */
let HOST;

if(process.env.NODE_ENV == "production"){
    HOST = "http://ec2-13-125-68-233.ap-northeast-2.compute.amazonaws.com:8888/api/v1/"
    console.log("production");
}else if(process.env.NODE_ENV == "development"){
    HOST = "http://ec2-13-125-68-233.ap-northeast-2.compute.amazonaws.com:8888/api/v1/"
    console.log("development");
}else if(process.env.NODE_ENV == "testing"){
    console.log("testing")
    HOST = "http://ec2-13-125-68-233.ap-northeast-2.compute.amazonaws.com:8888/api/v1/"
}
const Paths = {
    login: {url:HOST+"login",method:"post"},
    regiser: {url:HOST+"signUp",method:"post"},
    loadProdCategorys: {url:HOST+"loadProdCategorys",method:"get"},
    loadProductsByProdCategory: {url:HOST+"loadProductsByProdCategory",method:"post"},
    products: {url:HOST+"loadProducts",method:"post"},
    details: {url:HOST+"loadProductDetail",method:"post"},
    recommendation: {url:HOST+"loadRecProds",method:"post"},
    search: {url:HOST+"search",method:"post"},
    storeBehavior: {url:HOST+"storeBehavior",method:"post"}
}

export default Paths;