package com.example.transfinitte_24_ip_dapp

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.transfinitte_24_ip_dapp.backend.RegistrationBase
import com.example.transfinitte_24_ip_dapp.backend.TransferBase
import com.example.transfinitte_24_ip_dapp.backend.Web3PatentClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    val web3PatentClient: Web3PatentClient
) : ViewModel() {
    val isSearchResult by mutableStateOf(false)

    suspend fun registerPatent(registrationBase: RegistrationBase): Boolean {
        val response = web3PatentClient.registerPatent(registrationBase)
        if (response != null && response.isSuccessful) {
            return true
        } else {
            Log.d("error message", response.message().toString())
            return false
        }
    }

    suspend fun transferOwnership(transferBase: TransferBase): Boolean {
        val response = web3PatentClient.transferPatent(transferBase)
        if (response != null && response.isSuccessful) {
            return true
        } else {
            Log.d("error message", response.message().toString())
            return false
        }
    }
}