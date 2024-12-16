package com.example.transfinitte_24_ip_dapp.navigation

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.runtime.currentCompositionLocalContext
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.transfinitte_24_ip_dapp.MainViewModel
import com.example.transfinitte_24_ip_dapp.screens.LandingPage
import com.example.transfinitte_24_ip_dapp.screens.PatentDetailPage
import com.example.transfinitte_24_ip_dapp.screens.RegisterPage
import com.example.transfinitte_24_ip_dapp.screens.TransferPage

@Composable
fun Navigation(context: Context) {
    val navController = rememberNavController()
    val viewModel: MainViewModel = hiltViewModel<MainViewModel>()

    NavHost(
        navController = navController,
        startDestination = Screens.LandingPage.route
    ) {
        composable(route = Screens.LandingPage.route) {
            LandingPage(navController, viewModel)
        }

        composable(route = Screens.RegisterPage.route) {
            RegisterPage(navController, viewModel, context)
        }

        composable(route = Screens.TransferPage.route) {
            TransferPage(navController, viewModel, context)
        }

        composable(
            route = Screens.PatentDetailPage.route + "/{patentId}" + "/{title}" + "/{abstract}" + "/{description}",
            arguments = listOf(
                navArgument("patentId") {
                    type = NavType.StringType
                    nullable = false
                },
                navArgument("title") {
                    type = NavType.StringType
                    nullable = false
                },
                navArgument("abstract") {
                    type = NavType.StringType
                    nullable = false
                },
                navArgument("description") {
                    type = NavType.StringType
                    nullable = false
                }
            )
        ) {
            PatentDetailPage(
                navController = navController,
                patentId = it.arguments?.getString("patentId")!!,
                title = it.arguments?.getString("title")!!,
                abstract = it.arguments?.getString("abstract")!!,
                description = it.arguments?.getString("description")!!
            )
        }
    }
}