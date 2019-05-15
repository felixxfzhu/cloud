/**
 * Created by dell on 2019/4/21.
 */

import _ from "lodash";
import http from "./call";
import Paths from "./path";

function mapUrlObjToFuncObj(urlObj){
	const api= {}
	_.keys(urlObj).forEach((key)=>{
		const item = urlObj[key];
		api[key] = function(params){
			return http.post(item,params)
		}
	})
	return api;
}
function mapUrlObjToStrObj(urlObj){
	const url= {}
	_.keys(urlObj).forEach((key)=>{
		const item = urlObj[key];
		url[key] = item;
	})
	return url;
}

export const API = mapUrlObjToFuncObj(Paths);
export const URL = mapUrlObjToStrObj(Paths);