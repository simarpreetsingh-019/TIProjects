
from django.http import JsonResponse
from django.shortcuts import render
from web3 import Web3
from datetime import datetime, timedelta
import json
import os

from .models import Warranty
from django.shortcuts import render, redirect  



def load_contract():
    with open(os.path.join(os.path.dirname(__file__), '..', 'artifacts', 'contracts', 'Warranty.sol', 'Warranty.json')) as f:
        contract_data = json.load(f)
    
    abi = contract_data['abi']
    address = '0xA51552879ade9Fb4346e274939Cf790c72EA576f'
    return abi, address

# Connect to the local Ethereum node
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
abi, contract_address = load_contract()
contract = w3.eth.contract(address=contract_address, abi=abi)


def settings_view(request):
    return render(request, 'settings.html')

def helpcenter(request):
    return render(request, 'helpcenter.html')

def marketwarrranties(request):
    return render(request, 'marketwarranties.html' )

def profile(request):
    return render(request, 'profile.html')

def warranty_detail(request):
    
    return render(request, 'warranty_detail.html' ,{}) 



def get_warranty_info(request, user_address):
    try:
        warranties = Warranty.objects.filter(user_address=user_address)

        if not warranties:
            return JsonResponse({'error': 'No warranties found for this address'}, status=404)

        expiring_warranties = []
        for warranty in warranties:
            if warranty.warranty_end_date <= datetime.now().date() + timedelta(days=10):
                expiring_warranties.append(warranty)

       
        return render(request, 'warranty_detail.html', {
            'warranties': warranties,
            'expiring_warranties': expiring_warranties
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
