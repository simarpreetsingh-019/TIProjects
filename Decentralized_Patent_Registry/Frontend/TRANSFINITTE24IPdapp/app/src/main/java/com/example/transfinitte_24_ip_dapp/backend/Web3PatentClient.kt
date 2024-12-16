package com.example.transfinitte_24_ip_dapp.backend

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface Web3PatentClient {
    @POST("/register")
    suspend fun registerPatent(@Body registrationBase: RegistrationBase): Response<RegistrationResponse>

    @POST("/transfer")
    suspend fun transferPatent(@Body transferBase: TransferBase): Response<TransferResponse>

//    @GET("/patentDetails")
//    suspend fun getPatentDetails(@Query("patentId") patentId: String): Response<PatentDetailsResponse>

}