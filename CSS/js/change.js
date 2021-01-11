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

const cid1=[["PENNY", 1.01], ["NICKEL", 2.05],
["DIME", 3.1], ["QUARTER", 4.25], 
["ONE", 90], ["FIVE", 55], ["TEN", 20], 
["TWENTY", 60], ["ONE HUNDRED", 100]];

const cid=[["PENNY", 1.01], ["NICKEL", 2.05],
["DIME", 3.1], ["QUARTER", 4.25], 
["ONE", 1090], ["FIVE", 5], ["TEN", 20], 
["TWENTY", 0], ["ONE HUNDRED", 0]];

const cid2=[["PENNY", 0.5], ["NICKEL", 0],
["DIME", 0], ["QUARTER", 0], 
["ONE", 0], ["FIVE", 0], ["TEN", 0], 
["TWENTY", 0], ["ONE HUNDRED", 0]];

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
        let bestSolution= findBestSolution(price,cash);
        result = isInCid(bestSolution,cid);
    }
    if(result.status!=="CLOSED"){
        if(result.change.length>0){
            let  output= unitOutput(result.change);
            result.change=output;
        }
    }else{
        result.status="CLOSED";
        result.change= cid;
    }
  
    console.log("--3--final solution-",result);
    return result;

}

function unitOutput(bestSolution){
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
    let output=[];
    bestSolution.some(x=>{
        if(x.newItems == undefined){
            output.push(x);
        }else if(x.newItems.flag){
            x.newItems.items.some(y=>{
                output.push(y);
            })
        }else if(x.newItem !== undefined){
            output.push(x.newItem);
        }
    });
    output= output.map(x=>{
        const temp=[];
        const str=x.TYPE;
        temp.push(str);
        temp.push(x.COUNT*UnitToValue[x.TYPE]);
        return temp;
    })
    console.log("unit: ",output);
    return merge(output);
}
/**
 * [ [ 'TWENTY', 60 ],
     [ 'TEN', 10 ],
     [ 'FIVE', 5 ],
     [ 'ONE', 1 ],
     [ 'QUARTER', 0.5 ],
     [ 'DIME', 0.2 ],
     [ 'PENNY', 0.04 ],
     [ 'TEN', 10 ],
     [ 'FIVE', 10 ] ],
 */

function merge(output){
    let temp={};
    output.some(x=>{
        if(!Object.keys(temp).includes(x[0])){
            temp[x[0]]=x[1];
        }else{
            temp[x[0]]=temp[x[0]]+x[1];
        }
    });
    let result=[];
    Object.keys(temp).some(x=>{
        result.push([x,temp[x]]);
    })

   // console.log(result);
    return result;
}
merge([ [ 'TWENTY', 60 ],
[ 'TEN', 10 ],
[ 'FIVE', 5 ],
[ 'ONE', 1 ],
[ 'QUARTER', 0.5 ],
[ 'DIME', 0.2 ],
[ 'PENNY', 0.04 ],
[ 'TEN', 10 ],
[ 'FIVE', 10 ] ]);
// checkCashRegister(19.5,20,cid2);

function findBestSolution(price,cash){
    let output=[];
    let bestSolution=[];
    let pre = String(cash-price);
    let big,small;
    let bigPre=[];
    let smallPre=[];
    if(pre.indexOf(".")>-1){
        big= pre.split(".")[0];
        small= pre.split(".")[1];
        bigPre= diffNum(big);
        smallPre=Number("0."+small)*100;
       
    }else{
        big=pre;
        bigPre= diffNum(big);
    }   
    
     bestSolution= getArrayFromObjects(diffPreBigData(bigPre),diffPreSmallData(smallPre))

   // console.log("-1 bestSolution:--",bestSolution);
   
    return bestSolution;
}


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
function addNewItemToBestSolution(bestSolution,item,count){
    bestSolution.push(item.COUNT=count)
    return bestSolution;
}

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
                 if(inWork.COUNT>0){
                     const temp = x.COUNT;
                    let newItem = {...x};

                    x.COUNT= inWork.COUNT;
                    x.OK= true;
                  
                    newItem.COUNT=temp-inWork.COUNT;
                    bestSolution.push(newItem);
                    return x;
                 }else{
                    return x;
                 }   
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
                    w.COUNT= w.COUNT-inBest[0].COUNT;
                    w.SUM= Number((w.COUNT*UnitToValue[w.TYPE]).toFixed(2));
                    return w;
                }else{
                    return w;
                }       
            });
            let totalChange= change.reduce((acc,c)=>acc+c.SUM,0);
            if(totalChange>0){
                result={"status":"OPEN",change:bestSolution};
            }else{
                result={"status":"CLOSED",change:bestSolution};
            }
         }else{
             // try find new solution
             /**
              * 
              */
            result = tryFindNewSolution(workCid,bestSolution,UnitToValue);
         }
    
   // console.log("--2 final Solution--",result);
    return result;
}

/**
 * // 1:from bestSolution  filter all items which need to find more lower level items
 * // 2: try to finish all items, if success then get final good result; else: no exact change
 */
function tryFindNewSolution(workCid,bestSolution,UnitToValue){
    let allOkItems = bestSolution.filter(x=> x.OK==true);
    let allFailItems = bestSolution.filter(x=>x.OK==false);
    let result={} ;

    // after this, only deal with allFailItems  => at final update the final bestSolution;
    let currentItem ={};
    for(let i=0;i<allFailItems.length;i++){

        currentItem=allFailItems[i];
        currentItem["newItems"]={flag:false,currentSum:0,items:[]};
        let beginIndex= getBeginIndex(workCid,allFailItems[i]);
        
        if(beginIndex>-1){
            let isFind = findSolution(UnitToValue,bestSolution,workCid,beginIndex,currentItem);
            if(!isFind){
                result={"status":"INSUFFICIENT_FUNDS",change:[]};
                break;
            }
        }else{
            result={"status":"INSUFFICIENT_FUNDS",change:[]};
            break;
        }
    }
    if(result.status == undefined){
        let totalLeft = workCid.reduce((acc,x)=>acc+x.SUM,0);
        result.change= dealNewSolution(allOkItems,allFailItems);
        if(totalLeft>0){
            result.status="OPEN";
        }else{
            result.status="CLOSED";       
        }
    }


    return result;
}
//currentItem["newItems"]={flag:false,currentSum:0,items:[]};
function dealNewSolution(allOkItems,allFailItems){
    let result = [...allOkItems];

    for(let i=0;i<allFailItems.length;i++){
       result.push(allFailItems[i]);
    }
   // console.log("final---",result);
    return result;
}


function findSolution(UnitToValue,bestSolution,workCid,beginIndex,currentItem){
    let isFind =false;

    for(let i=beginIndex;i>=0;i--){
        // check current layer is handle the demand;
        let result = isHandle(UnitToValue,bestSolution,workCid[i],currentItem);

        if(result.handle){
            // 1: currentItem OK:newItem, newItem:{"TYPE":"PENNY","COUNT":1,"OK":true}
            // workCid update 
            if(currentItem.newItems.currentSum ==0){
                // one time find meet the demand;
                currentItem.OK="newItem";
                //delete currentItem.newItems;
                currentItem["newItem"]={"TYPE":result.type,"COUNT":result.provideNum,"OK":true};
                workCid.some(x=>{
                    if(x.TYPE==result.type){
                        x.COUNT =x.COUNT- result.provideNum;
                        x.SUM= x.SUM- result.provideSum;
                    }
                });
            }else{
                // multiple finds and meet the demand;
                currentItem.newItems.flag=true;
                currentItem.OK=true;
                currentItem.newItems.items.push({"TYPE":result.type,"COUNT":result.provideNum,"OK":true});
                currentItem.newItems.currentSum= currentItem.newItems.currentSum +result.provideSum;

                workCid.some(x=>{
                    if(x.TYPE==result.type){
                        x.COUNT =x.COUNT- result.provideNum;
                        x.SUM= x.SUM- result.provideSum;
                    }
                });

            }
            isFind=true;
            break;
        }else{
            // need to continue to find in next lower lever,
            if(result.provideNum>0){
                currentItem.newItems.items.push({"TYPE":result.type,"COUNT":result.provideNum,"OK":true});
                currentItem.newItems.currentSum= currentItem.newItems.currentSum +result.provideSum;
               
                workCid.some(x=>{
                    if(x.TYPE==result.type){
                        x.COUNT =x.COUNT- result.provideNum;
                        x.SUM= x.SUM- result.provideSum;
                    }
                });
            }
        }
    }

    return isFind;
}

function isHandle(UnitToValue,bestSolution,item,currentItem){
    let result ={handle:false,provideSum:0,provideNum:0};
    let maxNum= getMaxNumFromItem(bestSolution,item);
    let total = Number((maxNum * UnitToValue[item.TYPE]).toFixed(2));

    let value = currentItem.COUNT * UnitToValue[currentItem.TYPE] - currentItem.newItems.currentSum;

    if(total>=value){
        result.handle=true;
        result.provideSum= value;
        result.provideNum= value/UnitToValue[item.TYPE];
        result.type= item.TYPE;

    }else{
        result.provideSum= total;
        result.provideNum= maxNum;
        result.type=item.TYPE;

        
    }
    return result;
}


function getMaxNumFromItem(bestSolution,itemInWorkCid){
    let result=itemInWorkCid.COUNT;
    let fixNum =0;
    let node =bestSolution.filter(b=>b.TYPE == itemInWorkCid.TYPE)[0];
    if(node !== undefined){
        if(node.OK){
            fixNum= node.COUNT;
        }
    }
  
   result = result-fixNum;
   return result;

}

function getBeginIndex(workCid,item){
    let result= -1;
    for(let i=0;i<workCid.length;i++){
        if(workCid[i].TYPE== item.TYPE){
            result=i-1;
            break;
        }
    }
    return result;
}


function diffNum(str){
    let result =[];
    let arr=[...str];
    arr.map(x=>Number(x)).some((x,index)=>{
        result.push(x* Math.pow(10,arr.length-index-1));
    })
    return result;
}


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
    if(data==0){
        return result;
    }
    for(let i=0;i<data.length;i++){
        const d= data[i];
        if(d>=100){
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

        if(data>=10 && data<100){
            let flag=String(data/25); 

            if(flag.indexOf(".")>-1){
                const [left,right]= flag.split(".");
                if(Number(left)>=1){
                    result["QUARTER"]=Number(left);
                    const leftNum = data%25
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
                    const leftNum = data%25
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
                result["QUARTER"]=data/25;
            }
        }
        else if(data<10){
            if(data<5){
                result["PENNY"]=data;
            }else{
                if(data>5){
                    result["NICKEL"]=1;
                    result["PENNY"]=data-5;
                }else{
                    result["NICKEL"]=1;
                }
            }
        }
       
    
    //console.log(result);
    return result;
}

checkCashRegister(19.5, 20, 
    [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) ;