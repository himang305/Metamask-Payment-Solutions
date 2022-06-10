


  function metamask_pay(){
      if(typeof window.ethereum !== 'undefined'){ alert('OK metamask'); }
        let n = ethereum.chainId 
             if(n == '0x1'){
                  EThAppDeploy.loadEtherium();
             }else{
                 alert("Switch to Ethereum Network");
             }
  }
  
  EThAppDeploy = {
            loadEtherium: async () => {
                if (typeof window.ethereum !== 'undefined') {
                    EThAppDeploy.web3Provider = ethereum;
                    EThAppDeploy.requestAccount(ethereum);
                } else {
                    alert(
                        "Not able to locate an connection, please install a Metamask wallet"
                    );
                }
            },
            /****
             * Request A Account
             * **/
            requestAccount: async (ethereum) => {
                ethereum
                    .request({
                        method: 'eth_requestAccounts' //.     get account connected to website
                    })
                    .then((resp) => {
                        //do payments with activated account
                        
                        EThAppDeploy.payNow(ethereum, resp[0]);
                    })
                    .catch((err) => {
                        // Some unexpected error.
                        console.log(err);
                    });
            },
            /***
             *
             * Do Payment
             * */
            payNow: async (ethereum, from) => {
                var amount =   $('#inp_amount').val();    // Get amount to pay 
                ethereum
                    .request({
                        method: 'eth_sendTransaction',
                        params: [{
                            from: from,
                            to: "0xf922e3223567AeB66e6986cb09068B1B879B6ccc",   // account to pay
                            value: '0x' + ((amount * 1000000000000000000).toString(16)),
                        }, ],
                    })
                    .then((txHash) => {
                        if (txHash) {
                            alert(txHash);
//                            storeTransaction(txHash, amount);   // for storing transaction in DB 
                        } else { 
                            console.log("Something went wrong. Please try again");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        }
        
        
