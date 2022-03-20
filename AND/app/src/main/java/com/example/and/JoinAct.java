package com.example.and;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONException;
import org.json.JSONObject;

import androidx.appcompat.app.AppCompatActivity;

public class JoinAct extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.join);

        Button sum_bt = (Button) findViewById(R.id.sum_bt);
        Button back_bt = (Button) findViewById(R.id.back_bt);

        sum_bt.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String id = ((EditText)(findViewById(R.id.id))).getText().toString();
                String pw = ((EditText)(findViewById(R.id.pw))).getText().toString();

                JSONObject post = new JSONObject();
                String url = "http://192.168.0.3:3000/test";

                try {
                    post.accumulate("id", id);
                    post.accumulate("pw", pw);
                    Send networkTask = new Send(url, post,"GET","application/json");
                    String hi = networkTask.execute().toString();
                    Log.d("HI", hi);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                finish();
            }
        });

        back_bt.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                finish();
            }
        });
    }
}
