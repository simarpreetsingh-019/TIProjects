package com.example.transfinitte_24_ip_dapp.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.transfinitte_24_ip_dapp.navigation.Screens

@Composable
fun PatentListItem(
    title: String,
    patentId: String,
    abstract: String,
    description: String,
    navController: NavController
) {
    Card(
        onClick = {
            navController.navigate(buildString {
                append(Screens.PatentDetailPage.route)
                append("/$patentId")
                append("/$title")
                append("/$abstract")
                append("/$description")
            })
        },
        colors = CardDefaults.cardColors(
            containerColor = Color.DarkGray.copy(0.28f),
            contentColor = Color.White
        ),
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 5.dp),
    ) {
        Column(
            modifier = Modifier.padding(10.dp)
        ) {
            //title
            Text(
                text = title,
//                fontFamily = archivoBold,
                fontSize = 20.sp,
                modifier = Modifier.padding(bottom = 5.dp)
            )

            //patent Id
            Text(
                text = patentId,
//                fontFamily = archivoRegular,
                maxLines = 4,
                overflow = TextOverflow.Ellipsis
            )
            Spacer(modifier = Modifier.height(10.dp))

        }
    }
}

@Preview
@Composable
private fun prev() {
    PatentListItem(
        title = "e",
        patentId = "se",
        abstract = "sef",
        description = "wefy",
        navController = rememberNavController()
    )
}