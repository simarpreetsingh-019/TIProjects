package com.example.transfinitte_24_ip_dapp.di

import com.example.transfinitte_24_ip_dapp.backend.Web3PatentClient
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    @Singleton
    fun provideOkHttpClient(): OkHttpClient = OkHttpClient.Builder()
        .connectTimeout(
            60,
            TimeUnit.SECONDS
        )
        .readTimeout(
            60,
            TimeUnit.SECONDS
        )
        .build()

    @Provides
    @Singleton
    fun provideWeb3PatentClient(okHttpClient: OkHttpClient): Web3PatentClient = Retrofit.Builder()
        .baseUrl("http://localhost:3000")
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(Web3PatentClient::class.java)
}