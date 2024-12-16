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
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.transfinitte_24_ip_dapp.MainViewModel
import com.example.transfinitte_24_ip_dapp.backend.RegistrationBase
import com.example.transfinitte_24_ip_dapp.navigation.Screens
import com.example.transfinitte_24_ip_dapp.ui.theme.alumniSans
import com.example.transfinitte_24_ip_dapp.ui.theme.anticRegular
import kotlinx.coroutines.async
import kotlinx.coroutines.launch

@Composable
fun RegisterPage(navController: NavController, viewModel: MainViewModel, context: Context) {
    val localCoroutineScope = rememberCoroutineScope()
    var titleField by remember {
        mutableStateOf("")
    }
    var appNumber by remember {
        mutableStateOf("")
    }
    var abstractField by remember { mutableStateOf("") }
    var description by remember {
        mutableStateOf("")
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1B1B1B)),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.fillMaxSize(0.05f))
        Text(
            text = "Register Patent",
            color = Color.White,
            fontSize = 58.sp,
            fontFamily = alumniSans
        )
        Spacer(modifier = Modifier.fillMaxSize(0.05f))
        Column {
            Card(
                modifier = Modifier
                    .fillMaxWidth(0.9f)
                    .aspectRatio(.6f),
                colors = CardDefaults.cardColors(
                    containerColor = Color.Black
                ),
                border = BorderStroke(1.dp, Color.Yellow),
            ) {
                Column(
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally)
                        .verticalScroll(rememberScrollState()),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Spacer(modifier = Modifier.height(20.dp))
                    TextField(
                        modifier = Modifier
                            .fillMaxWidth(0.9f)
                            .height(60.dp),
                        value = titleField,
                        onValueChange = {
                            titleField = it
                        },
                        singleLine = true,
                        colors = TextFieldDefaults.colors(
                            unfocusedContainerColor = Color.Transparent,
                            focusedContainerColor = Color.Transparent,
                            unfocusedIndicatorColor = Color.White,
                            focusedIndicatorColor = Color.White,
                            unfocusedTextColor = Color.LightGray,
                            focusedTextColor = Color.LightGray,
                            focusedSupportingTextColor = Color.LightGray
                        ),
                        placeholder = {
                            Text(
                                text = "Title",
                                color = Color.Gray,
                                fontSize = 25.sp,
                                textAlign = TextAlign.Center,
                            )
                        },
                        maxLines = 1,
                        textStyle = TextStyle.Default.copy(fontSize = 30.sp),
                    )

                    TextField(
                        modifier = Modifier
                            .fillMaxWidth(0.9f)
                            .height(60.dp),
                        value = appNumber,
                        onValueChange = {
                            appNumber = it
                        },
                        singleLine = true,
                        colors = TextFieldDefaults.colors(
                            unfocusedContainerColor = Color.Transparent,
                            focusedContainerColor = Color.Transparent,
                            unfocusedIndicatorColor = Color.White,
                            focusedIndicatorColor = Color.White,
                            unfocusedTextColor = Color.LightGray,
                            focusedTextColor = Color.LightGray,
                            focusedSupportingTextColor = Color.LightGray
                        ),
                        placeholder = {
                            Text(
                                text = "Application Number",
                                color = Color.Gray,
                                fontSize = 25.sp,
                                textAlign = TextAlign.Center,
                            )
                        },
                        maxLines = 1,
                        textStyle = TextStyle.Default.copy(fontSize = 30.sp)
                    )

                    val charLimit = 1500
                    val focusManager = LocalFocusManager.current

                    //region abstract
                    Spacer(modifier = Modifier.height(20.dp))

                    Text(
                        "Abstract",
                        color = Color.Gray,
                        modifier = Modifier
                            .align(Alignment.Start)
                            .padding(start = 10.dp),
                        fontSize = 25.sp
                    )
                    TextField(
                        value = abstractField,
                        onValueChange = {
                            abstractField = it.take(charLimit)
                            if (it.length > charLimit) {
                                focusManager.moveFocus(FocusDirection.Down)
                            }
                        },
                        modifier = Modifier
                            .fillMaxWidth(0.9f)
                            .padding(top = 10.dp),
                        minLines = 20,
                        maxLines = 20,
                        shape = RoundedCornerShape(15.dp),
                        colors = TextFieldDefaults.colors(
                            unfocusedContainerColor = Color.LightGray.copy(alpha = 0.28f),
                            focusedContainerColor = Color.LightGray.copy(alpha = 0.28f),
                            unfocusedIndicatorColor = Color.Transparent,
                            focusedIndicatorColor = Color.Transparent,
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White
                        )
                    )
                    //endregion

                    //region description
                    Spacer(modifier = Modifier.height(20.dp))

                    Text(
                        "Description",
                        color = Color.Gray,
                        modifier = Modifier
                            .align(Alignment.Start)
                            .padding(start = 10.dp),
                        fontSize = 25.sp
                    )
                    TextField(
                        value = description,
                        onValueChange = {
                            description = it.take(charLimit)
                            if (it.length > charLimit) {
                                focusManager.moveFocus(FocusDirection.Down)
                            }
                        },
                        modifier = Modifier
                            .fillMaxWidth(0.9f)
                            .padding(top = 10.dp),
                        minLines = 20,
                        maxLines = 20,
                        shape = RoundedCornerShape(15.dp),
                        colors = TextFieldDefaults.colors(
                            unfocusedContainerColor = Color.LightGray.copy(alpha = 0.28f),
                            focusedContainerColor = Color.LightGray.copy(alpha = 0.28f),
                            unfocusedIndicatorColor = Color.Transparent,
                            focusedIndicatorColor = Color.Transparent,
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White
                        )
                    )
                    //endregion

                    Spacer(modifier = Modifier.height(20.dp))
                }
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth(0.9f)
                .padding(top = 30.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Button(
                onClick = {
                    localCoroutineScope.launch {
                        val isRegistered = localCoroutineScope.async {
                            viewModel.registerPatent(
                                RegistrationBase(
                                    title = titleField,
                                    description = description,
                                    userAddress = CONTRACT_ADDRESS
                                )
                            )
                        }

                        if (isRegistered.await()){
                            Toast.makeText(context, "Patent Registered!", Toast.LENGTH_SHORT).show()
                            navController.navigate(Screens.LandingPage.route)
                        } else {
                            Toast.makeText(context, "Registration unsuccessful", Toast.LENGTH_SHORT).show()
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
                    "Register",
                    color = Color.White,
                    fontSize = 18.sp,
                    textAlign = TextAlign.Center,
                    fontFamily = anticRegular
                )
            }
            Button(
                onClick = {
                    navController.navigate(Screens.LandingPage.route)
                },
                modifier = Modifier.width(120.dp),
                shape = RoundedCornerShape(10.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.DarkGray,
                ),
            ) {
                Text(
                    "Back",
                    color = Color.White,
                    fontSize = 18.sp,
                    textAlign = TextAlign.Center,
                    fontFamily = anticRegular
                )
            }
        }
    }
}