package org.domeos.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.yaml.snakeyaml.Yaml;

import net.sf.json.JSONObject;

/*
 * 仅适合于jsonObject的转化
 */
public class YamlToJson {

	public static void main(String[] args) throws FileNotFoundException{	
	       // public  static void load() throws FileNotFoundException{
		String document = "a: 1\nb:\n  c: 3\nd: 4\n";
	 
	  Yaml yaml=new Yaml();
      File file=new File("values.yaml");
      FileInputStream fs=new FileInputStream(file);
      JSONObject json = JSONObject.fromObject(yaml.load(fs));
      JSONObject resJson = new JSONObject();
      parseJSON2Map(resJson,json,null);
      System.out.println("resJson="+resJson.toString());
	}
	 /**
     * JSON 类型的字符串转换成 Map
     */
    public static void parseJSON2Map(JSONObject resJson,JSONObject json,String parentKey){
      
        //最外层JSON解析
        for(Object k : json.keySet()){
            Object v = json.get(k);
            //构造一个包含上层keyName的完整keyName
            String fullKey = (null == parentKey || parentKey.trim().equals("") ? k.toString() : parentKey + "." + k);
             if(isNested(v)){
                parseJSON2Map(resJson,(JSONObject)v,fullKey);
            }
            else{
            	resJson.put(fullKey, v);
            }
        }
    }
    public static boolean isNested(Object jsonObj){

        return jsonObj.toString().contains("{");
    }
}
