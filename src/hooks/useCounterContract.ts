import { useEffect, useState } from "react";
import { Counter } from '../contracts/Counter'
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano } from "@ton/core";                    


export function useCounterContract(){
   const client = useTonClient();
   const [val, setVal] = useState<null | string>();
   const { sender } = useTonConnect();
   const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

   const counterContract = useAsyncInitialize(async () => {
       if(!client) return;
       const contract = new Counter(
        Address.parse('EQDdU4tgOSKCvEPvBcdAOvkgCrMNjJGOeMKz2OfWDC1C5N0I')
       );
       return client.open(contract) as OpenedContract<Counter>;
   }, [client]);
   
   useEffect(() => {
       async function getValue() {
        if(!counterContract) return;
        setVal(null);
        const val = await counterContract.getCounter();
        setVal(val.toString());
        await sleep(10000); // 10 seconds
        getValue();
       }
       getValue();
   }, [counterContract]);

   return {
    value: val, 
    address: counterContract?.address.toString(),
    sendIncrement: () =>{
        return counterContract?.sendIncrease(sender, {increaseBy: 1, value: toNano('0.01')});
    }
};
}