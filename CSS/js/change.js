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

const cid=[["PENNY", 1.01], ["NICKEL", 2.05],
["DIME", 3.1], ["QUARTER", 4.25], 
["ONE", 90], ["FIVE", 55], ["TEN", 20], 
["TWENTY", 60], ["ONE HUNDRED", 100]];

function checkCashRegister(price,cash,cid){
    let result={};
    // 1 check Total_cid >= cash-price 
    // 2 : get BestSolution
    // 3: check BestSolution can be meet 
    // 4: try find update BestSolution version
    let totalCid = cid.reduce((acc,x)=>acc+x[1],0);
    if(totalCid<cash-price){
        result={"status":"INSUFFICIENT_FUNDS",change:[]};
    }else{
        let solution= preData(price,cash);
    }

}

function preData(price,cash){
    let bestSolution=[];
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
    
     bestSolution= getArrayFromObjects(diffPreBigData(bigPre),diffPreSmallData(smallPre))

    console.log(bestSolution);
    return bestSolution;
}
//preData();

function getArrayFromObjects(bigPre,smallPre){
    let result=[];
    Object.keys(bigPre).some(key=>{
        result.push({"TYPE":key,"COUNT":bigPre[key],"OK":false});
    })
    Object.keys(smallPre).some(key=>{
        result.push({"TYPE":key,"COUNT":smallPre[key],"OK":false});
    })
    return result;

}

// 1:check the cid can handle the best change solution;
// 2: in cid, can meet the best solution degrade version
// 3: if 2 fail then  can not exact change;
/**
 * checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
 */

 /*
    1:getTotal of Cid  as TotalInCid , if change >TotalInCid 
    2: change <= TotalInCid
    3: check bestSolution can be meet ? yes =>then check left is open or suspend;
    4: If bestSolution is not fit  =>
    [100,20,10,5,1,0.25,0.10,0.05,0.01]
 */

function isInCid(bestSolution,dic){
    const UnitToValue={
        "ONE HUNDRED":100,
        "TWENTY":20,
        "TEN":10,
        "FIVE":5,
        "ONE":1,
        "QUARTER":0.25,
        "DIME":0.1,
        "NICKEL":0.05,
        "PENNY":0.01
    };
    let change;
    let result;
    //"TYPE":"PENNY","SUM":1.01,"COUNT":101
    // "TYPE":"PENNY","COUNT":1,"OK":false
    const workCid= dic.map(x=>{
        return {"TYPE":x[0],"SUM":x[1],"COUNT":Math.ceil(x[1]/UnitToValue[x[0]])};
    });   
    let isAllMeet =true;
         bestSolution.map(x=>{
             let inWork = workCid.filter(w=>w.TYPE == x.TYPE)[0];
             if(inWork.COUNT>= x.COUNT){
                 x.OK=true;
                 return x;
             }else{
                 x.COUNT= x.COUNT-inWork.COUNT;
                return x;
             }
         });
         for(let i=0;i<bestSolution.length;i++){
             if(!bestSolution[i].OK){
                 isAllMeet=false;
                 break;
             }
         }
         if(isAllMeet){
             // workCid - bestSolution
           change =  workCid.map(w=>{
                let inBest= bestSolution.filter(b=>b.TYPE== w.TYPE);
                if(inBest.length>0){
                    w.COUNT= w.COUNT-inBest.COUNT;
                    w.SUM=Number((w.COUNT*UnitToValue[w.TYPE]).toFixed(2));
                    return w;
                }else{
                    return w;
                }       
            });
            let totalChange= change.reduce((acc,c)=>acc+c.SUM,0);
            if(totalChange>0){
                result={"status":"OPEN",change:change};
            }else{
                result={"status":"CLOSE",change:change};
            }
         }else{
             // try find new solution
             /**
              * 
              */
         }
    
    console.log(workCid);
}
/**
 * // 1:from bestSolution  filter all items which need to find more lower level items
 * // 2: try to finish all items, if success then get final good result; else: no exact change
 */
function tryFindNewSolution(workCid,bestSolution,UnitToValue){
    let allFailItems = bestSolution.filter(x=>x.OK==false);
    let result ;
    for(let i=0;i<allFailItems.length;i++){
        let beginIndex= getBeginIndex(workCid,allFailItems[i]);
        if(beginIndex>-1){

        }else{
            result={"status":"INSUFFICIENT_FUNDS",change:[]};
            break;
        }
    }
    return result;
}
function findSolution(workCid,beginIndex,value){
    let acc=0;
    for(let i=beginIndex;i<workCid.length;i++){
        
    }
}
function isHandle(item,value){
    
}

function getMaxNumFromItem(bestSolution,itemInWorkCid){
    let result=itemInWorkCid.COUNT;
    let fixNum =0;
    let node =bestSolution.filter(b=>b.TYPE == itemInWorkCid.TYPE)[0];
   if(node.OK){
       fixNum= node.COUNT;
   }
   result = result-fixNum;
   return result;

}

function getBeginIndex(workCid,item){
    let result= -1;
    for(let i=0;i<workCid.length;i++){
        if(workCid[i].TYPE== item.TYPE){
            result=i+1;
            break;
        }
    }
    return result;
}


 isInCid();

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
   // console.log(result);
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
    //console.log(result);
    return result;
}
