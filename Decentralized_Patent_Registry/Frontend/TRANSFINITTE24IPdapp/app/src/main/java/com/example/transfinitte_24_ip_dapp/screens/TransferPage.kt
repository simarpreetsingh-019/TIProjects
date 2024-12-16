package com.example.transfinitte_24_ip_dapp.screens

import CONTRACT_ADDRESS
import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.transfinitte_24_ip_dapp.MainViewModel
import com.example.transfinitte_24_ip_dapp.backend.RegistrationBase
import com.example.transfinitte_24_ip_dapp.backend.TransferBase
import com.example.transfinitte_24_ip_dapp.ui.theme.alumniSans
import com.example.transfinitte_24_ip_dapp.ui.theme.anticRegular
import kotlinx.coroutines.async
import kotlinx.coroutines.launch


@Composable
fun TransferPage(
    navController: NavController,
    viewModel: MainViewModel,
    context: Context
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1B1B1B)),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        var patentId by remember { mutableStateOf("") }
        var curOwner by remember { mutableStateOf("") }
        var newOwner by remember { mutableStateOf("") }
        val localCoroutineScope = rememberCoroutineScope()

        Spacer(modifier = Modifier.fillMaxSize(0.05f))
        Text(
            text = "Transfer Patent",
            color = Color.White,
            fontSize = 58.sp,
            fontFamily = alumniSans
        )
        Spacer(modifier = Modifier.fillMaxSize(0.05f))

        Column {
            Card(
                modifier = Modifier
                    .fillMaxWidth(0.8f),
                colors = CardDefaults.cardColors(
                    containerColor = Color.Black,
                ),
                border = BorderStroke(width = 1.dp, color = Color.Yellow)
            ) {
                Column(
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Spacer(modifier = Modifier.height(40.dp))
                    Row(
                        horizontalArrangement = Arrangement.Center,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        OutlinedTextField(
                            modifier = Modifier.fillMaxWidth(0.7f),
                            value = patentId,
                            onValueChange = { patentId = it }, // Handles the text changes
                            textStyle = TextStyle(color = Color.White),
                            label = { Text("Patent ID") }
                        )
                    }

                    Spacer(modifier = Modifier.height(40.dp))
                    Row(
                        horizontalArrangement = Arrangement.Center,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        OutlinedTextField(
                            modifier = Modifier.fillMaxWidth(0.7f),
                            value = curOwner,
                            onValueChange = { curOwner = it }, // Handles the text changes
                            textStyle = TextStyle(color = Color.White),
                            label = { Text("Name of Current Owner") }
                        )
                    }

                    Spacer(modifier = Modifier.height(40.dp))
                    Row(
                        horizontalArrangement = Arrangement.Center,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        OutlinedTextField(
                            modifier = Modifier.fillMaxWidth(0.7f),
                            value = newOwner,
                            onValueChange = { newOwner = it }, // Handles the text changes
                            textStyle = TextStyle(color = Color.White),
                            label = { Text("Name of new owner") }
                        )
                    }
                    Spacer(modifier = Modifier.height(40.dp))

                }
            }
        }
        Spacer(modifier = Modifier.height(40.dp))

        Button(
            onClick = {
                localCoroutineScope.launch {
                    val isTransferred = localCoroutineScope.async {
                        viewModel.transferOwnership(
                            TransferBase(
                                fromAddress = curOwner,
                                patentId = patentId,
                                toAddress = newOwner
                            )
                        )
                    }
                    if (isTransferred.await()){
                        Toast.makeText(context, "Transfer success!", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(context, "Transfer unsuccessful", Toast.LENGTH_SHORT).show()
                    }
                }
            },
            modifier = Modifier.width(120.dp),
            shape = RoundedCornerShape(10.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.DarkGray,
            ),
        ) {
            Text(
                "Transfer",
                color = Color.White,
                fontSize = 18.sp,
                textAlign = TextAlign.Center,
                fontFamily = anticRegular
            )
        }
    }
}