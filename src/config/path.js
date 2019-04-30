/**
 * Created by dell on 2019/4/21.
 */
const Paths = {
    host:"https://www.bai.cn",
    getdata:"/search/index"
}
if(process.env.NODE_ENV == "production"){
    Paths["host"] = "https://www.production.cn"
    console.log("production");
}else if(process.env.NODE_ENV == "development"){
    Paths["host"] = "https://www.development.cn"
    console.log("development");
}else {
    console.log("testing")
    Paths["host"] = "https://www.testing.cn"
}

export default Paths;