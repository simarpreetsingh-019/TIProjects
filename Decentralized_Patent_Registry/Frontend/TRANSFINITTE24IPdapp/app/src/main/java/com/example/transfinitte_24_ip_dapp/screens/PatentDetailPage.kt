package com.example.transfinitte_24_ip_dapp.screens

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController

@Composable
fun PatentDetailPage(
    patentId: String,
    title: String,
    abstract: String,
    description: String,
    navController: NavController
) {

}

@Preview
@Composable
private fun prev() {
    PatentDetailPage(
        patentId = "awd",
        title = "aedaefe",
        abstract ="e,ifawuiefwliuef",
        description = " oeifoaedjowi;f",
        navController = rememberNavController()
    )
}