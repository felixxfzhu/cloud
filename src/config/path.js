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
    login: HOST+"login",
    products: HOST+"loadProducts",
    detail: HOST+"loadProductDetail",
    recommendation:HOST+"loadRecProds",
    search: HOST+"search",
    storeBehavior: HOST + "storeBehavior"
}

export default Paths;