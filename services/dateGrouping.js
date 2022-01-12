const moment = require('moment')
const groupItemsByData = (items) => {
    let entries = {}
    let keys = []
    let results = []
    let data = []


      const date = moment(items["created_at"]).format('LLL')
      // const date2 = moment(items["created_at"]).format('LL').split(",")[0]
        if(items.length > 0) {
          items.map(item => {
            let records = []
            entries.records = records

            // console.log("dataLength", data.length)
            
             
             if(entries != null){
              if( entries.date == item.created_at){
                 entries[records].push(item)
              }else {
                entries[date] = item.created_at
                entries.records.push(item)
           
              }
              
            }
             
            
            console.log("resultLength", entries)
            // console.log("filteredLength", filtered.length)
          // {
            //    if(entries[date] != null && i.created_at == item.created_at){
              
              //       entries[date].push(i)
              
            //  console.log("data:",i)
            //  results.push({
              //       "date": item.created_at,
              //       "record":entries[key]
              //   })
              
              //    }
              
        //  })
         
         
        })
        // console.log("creatdedData:", entries)


      //  console.log(filteredByDate)
          // if(entries[date] != null){
          //     entries[date].push(items)
          // }else {
          //     keys.push(date)
          //     entries[date] = [items]
          // }
          
          // check array for same date
          // create an object with new date and a recordss array
          // add date to object date, then items to record array
          // push object to a last array to be sent out
  
          // console.log("entries from grouping:", keys)
          keys.map(key => {
            results.push({
                  "date": key,
                  "record":entries[key]
              })
              
          })
        }
    // console.log("results from grouping:", results)
    // return results
   }

   module.exports = groupItemsByData