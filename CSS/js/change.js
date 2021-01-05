/**
 * 0:算法策略：总数最少，满足需求，
 * 1: preData 1923.78= [1000,900,20,3] and [70,8]
 * 
 * 2: 根据 1 给出 总数最少的 找零策略，然后，根据 拥有的钱 进行判断：（无法满足，可以，没钱了，可以，还有钱）
 * JavaScript Algorithms and Data Structures Projects: Cash Register
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
 */
// 1923.78= [1000,900,20,3] and [70,8]
function preData(price,cash){
    let pre = String(cash-price);
    let big,small;
    let bigPre=[];
    let smallPre=[];
    if(pre.indexOf(".")>-1){
        big= pre.split(".")[0];
        small= pre.split(".")[1];
        bigPre= diffNum(big);
        smallPre= [Number(small)];
    }else{
        big=pre;
        bigPre= diffNum(big);
    }   
    diffPreBigData(bigPre);
    diffPreSmallData(smallPre);
    console.log(bigPre,smallPre);
}

// 1:check the cid can handle the best change solution;
// 2: in cid, can meet the best solution degrade version
// 3: if 2 fail then  can not exact change;

function isInCid(){
    
}

function diffNum(str){
    let result =[];
    let arr=[...str];
    arr.map(x=>Number(x)).some((x,index)=>{
        result.push(x* Math.pow(10,arr.length-index-1));
    })
    return result;
}

preData(12.23,2000);

// 100,20,10,5,1; -- 25,10,5,1 
//[ 1000, 900, 80, 7 ] [ 60, 6 ]
/*
checkCashRegister(19.5, 20, 
    [["PENNY", 1.01], -1 
    ["NICKEL", 2.05],  -5
    ["DIME", 3.1],     -10
    ["QUARTER", 4.25],  -25
     ["ONE", 90],       1
     ["FIVE", 55],      5
     ["TEN", 20],       10
     ["TWENTY", 60],    20
      ["ONE HUNDRED", 100]]); 100
*/
function diffPreBigData(data){
    let result={};
    for(let i=0;i<data.length;i++){
        const d= data[i];
        if(d>100){
            if(result["ONE HUNDRED"]!== undefined){
                result["ONE HUNDRED"]=result["ONE HUNDRED"] +d/100;
            }else{
                result["ONE HUNDRED"]=d/100;
            }       
        }else if(d>=10 && d<100){
            let flag=String(d/20); 
            if(flag.indexOf(".")>-1){
                result["TWENTY"]=Number(flag.split(".")[0]);
                result["TEN"]=1
            }else{
                result["TWENTY"]=d/20;
            }
        }else if(d<10){
            if(d<5){
                result["ONE"]=d;
            }else{
                if(d>5){
                    result["FIVE"]=1;
                    result["ONE"]=d-5;
                }else{
                    result["FIVE"]=1;
                }
            }
        }
       
    }
    console.log(result);
    return result;
}
/*
 [["PENNY", 1.01], -1 
    ["NICKEL", 2.05],  -5
    ["DIME", 3.1],     -10
    ["QUARTER", 4.25],  -25
*/
function diffPreSmallData(data){
    let result={};
    for(let i=0;i<data.length;i++){
        const d= data[i];
        if(d>=10 && d<100){
            let flag=String(d/25); 

            if(flag.indexOf(".")>-1){
                const [left,right]= flag.split(".");
                if(Number(left)>=1){
                    result["QUARTER"]=Number(left);
                    const leftNum = d%25
                    if(leftNum>=10){
                        if(String(leftNum/10).indexOf(".")>-1){
                            const [left1,right1]=String(leftNum/10).split(".");
                            result["DIME"]=Number(left);
                            const leftNum2= leftNum%10;
                            if(leftNum2<5){
                                result["PENNY"]=leftNum2;
                            }else{
                                if(leftNum2>5){
                                    result["NICKEL"]=1;
                                    result["PENNY"]=leftNum2-5;
                                }else{
                                    result["NICKEL"]=1;
                                }
                            }
                        }else{
                            result["DIME"]=leftNum/10;
                        }
    
                    }else{
                        if(leftNum<5){
                            result["PENNY"]=leftNum;
                        }else{
                            if(leftNum>5){
                                result["NICKEL"]=1;
                                result["PENNY"]=leftNum-5;
                            }else{
                                result["NICKEL"]=1;
                            }
                        }
                    }


                }else{
                    const leftNum = d%25
                    if(leftNum>=10){
                        if(String(leftNum/10).indexOf(".")>-1){
                            const [left1,right1]=String(leftNum/10).split(".");
                            result["DIME"]=Number(left);
                            const leftNum2= leftNum%10;
                            if(leftNum2<5){
                                result["PENNY"]=leftNum2;
                            }else{
                                if(leftNum2>5){
                                    result["NICKEL"]=1;
                                    result["PENNY"]=leftNum2-5;
                                }else{
                                    result["NICKEL"]=1;
                                }
                            }
                        }else{
                            result["DIME"]=leftNum/10;
                        }
    
                    }else{
                        if(leftNum<5){
                            result["PENNY"]=leftNum;
                        }else{
                            if(leftNum>5){
                                result["NICKEL"]=1;
                                result["PENNY"]=leftNum-5;
                            }else{
                                result["NICKEL"]=1;
                            }
                        }
                    }
                }

              
            }else{
                result["QUARTER"]=d/25;
            }
        }else if(d<10){
            if(d<5){
                result["PENNY"]=d;
            }else{
                if(d>5){
                    result["NICKEL"]=1;
                    result["PENNY"]=d-5;
                }else{
                    result["NICKEL"]=1;
                }
            }
        }
       
    }
    console.log(result);
    return result;
}
