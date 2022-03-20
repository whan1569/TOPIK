package com.example.and;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

public class Send extends AsyncTask<String, String, String> {
    Object bye;
    String urls,t1,t2;
    public  Send(String _url, JSONObject _params, String type1, String type2) {
        bye=_params;
        urls=_url;
        t1=type1;
        t2=type2;
    }
    public  Send(String _url, HashMap _params, String type1, String type2) {
        bye=_params;
        urls=_url;
        t1=type1;
        t2=type2;
    }
    @Override
    protected String doInBackground(String... strings) {
        HttpURLConnection con = null;

        try{
            URL url = new URL(urls);
            con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod(t1);
//                    con.setRequestProperty("Cache-Control", "no-cache");//캐시 설정
            if(t1=="GET")
                con.setDoOutput(false);//Outstream으로 post 데이터를 넘겨주겠다는 의미
            else
                con.setDoOutput(true);//Outstream으로 post 데이터를 넘겨주겠다는 의미
            con.setDoInput(true);//Inputstream으로 서버로부터 응답을 받겠다는 의미
            con.setRequestProperty("Content-Type", t2);//application JSON 형식으로 전송
            con.connect();
            if(!t1.equals("GET")) {
                OutputStream outStream = con.getOutputStream();
                //버퍼를 생성하고 넣음
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outStream));
                writer.write(bye.toString());
                writer.flush();
                writer.close();//버퍼를 받아줌

                // [2-3]. 연결 요청 확인.
                // 실패 시 null을 리턴하고 메서드를 종료.
                if (con.getResponseCode() != HttpURLConnection.HTTP_OK)
                    return null;
            }
            // [2-4]. 읽어온 결과물 리턴.
            // 요청한 URL의 출력물을 BufferedReader로 받는다.
            BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
            // 출력물의 라인과 그 합에 대한 변수.
            String line;
            boolean che=false;
            String page = "";
            // 라인을 받아와 합친다.
            while ((line = reader.readLine()) != null){
                che=true;
                page += line;
            }
            Log.d("bool", String.valueOf(che));
            if(che==true)
                return page;
            else
                return "1";
        } catch (MalformedURLException e) { // for URL.
            e.printStackTrace();
        } catch (IOException e) { // for openConnection().
            e.printStackTrace();
        } finally {
            if (con != null)
                con.disconnect();
        }
        return null;
    }
}
