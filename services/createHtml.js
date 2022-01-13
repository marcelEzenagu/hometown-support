const fs = require('fs');
const moment = require('moment')
const getUserTransactions = require("../controllers/report/getUserTransactions")
// Build paths
const { buildPathHtml } = require('./buildPaths');
const path = require('path');
const getUserByEmail = require('../controllers/user/userCtrl');

const img = path.resolve("./assets/hometown.jpg")

/*
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath 
 * @returns {Boolean}
 */

const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {
		return false;
	}
};

const getPdfData = async({start_date, end_date, userEmail}) => {
  const data = await getUserTransactions({start_date, end_date, userEmail});

  try {
    /* Check if the file for `html` build exists in system or not */
    if (doesFileExist(buildPathHtml)) {
      console.log('Deleting old build file');
      /* If the file exists delete the file from system */
      fs.unlinkSync(buildPathHtml);
    }
    /* generate rows */
  
    const {userDetails,items,totalCredit,totalDebit} = data
    
      /* generate table */
      // const table = createTable(rows);
      /* generate html */
      const html = createHtml(items, img,userDetails,totalCredit,totalDebit);
      /* write the generated html to file */
      fs.writeFileSync(buildPathHtml, html);
      console.log('Succesfully created an HTML table');
  } catch (error) {
    console.log('Error generating table', error);
  }
}



/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (items, img, user,totalCredit,totalDebit,) =>
`
  <html>
    <head>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          
         }
        tr {
          text-align: left;
          border: 1px solid black;
          
        }
        #table-row {
          border-bottom: 4px solid black;

        }
        th, td {
          padding: 5px;
          width:60;
          border: 0.3px solid black;
        }
        #headerLeft {
          width:40%;
        }
        #headerRight {
          width:40%;
          margin-left:40px
        }
        header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          color:#804b34;
        }
        img{width:25%}
        #user{
          font-size:18;
        }
        #statement{
          border-bottom: 1px solid #804b34!important;
          font-size:20px;
          text-align:center;
          margin:20px 0px
        }
        .credit{
          color:green;
        }
        .debit{
          color:red;
        }
        #summary{
          display:flex;
          align-items:flex-start;
        }
        #summary span {
          padding-left:20px;
        }
      </style>
    </head>
    <body style="background-origin: content-box; background:url(${"../assets/op-home.png"}) space center,300px 600px !important;" >
      <header>
        <div id="headerLeft">
          <p  >
          Blossom House,
          <br/> 
          Last Floor, 
          <br/>
          DBS Road,
          <br/>
          Asaba, 
          <br/>
          Delta State,
          <br/>
          Nigeria

          </>
        </div>

        <img src=${img} alt="homeTown logo" />
        <div id="headerRight">
          <strong>Tel:</strong> ${" "}+234 80 3123 0668
          <br/>
              +234 90 5609 7944
          <br/>
          <strong>Email: </strong> ${" "}connect@gethometown.app
          <br/>
          <strong>Web: </strong> ${" "}www.gethometown.app
          <br/>
          <strong> RC: </strong> ${" "}1662509

        </div>
      
      </header>
     
      <div>
        <h4 id="statement">Account Statement</h4>
        <p >
          <span>Full Name: ${" "}
            <strong id="user" >${user.name}</strong> 
          </span>
          </br>
          <span>Email Address: ${" "}
            <strong id="user" >${user.email}</strong> 
          </span>
          </br>
          <span>Account Number: ${" "}
            <strong id="user" >${user.account_number}</strong> 
          </span>
          </br>
          <span>Account Balance: ${" "}
            <strong id="user" >&#x20A6; ${user.accountBalance}</strong> 
          </span>
          </br>
        </p>
      </div
      <div>
        <p>Summary </p>
        <div id="summary">
          <span>Money In ${" "}
            <br/>
            <strong id="user" >&#x20A6; ${totalCredit}</strong> 
          </span>
          
          <span>Money Out ${" "}
            <br/>
            <strong id="user" >&#x20A6; ${totalDebit}</strong> 
          </span>
        
        </div>
      </div>
        <div style="display:flex; min-height:100vh; flex-direction:column;justify-content:center;">
          
            <div  style="display:flex; justify-content:space-between;padding:5px;margin-bottom:5px;" class="data-elements" >
              <div style="display:flex;justify-content:flex-start;align-items:center;width:50%;">
                <h5 style="width:25%;" >Date</h5>
                <h5 style="width:75%;"  >Description</h5>
              </div>
              <div style="display:flex; justify-content:space-evenly; align-items:flex-end; width:50%">
                <h5  >Debit</h5>
                <h5 >Credit</h5>
                <h5>Type</h5>
                <h5>Balance</h5>
              </div>
            </div>
            ${items.map( i => 
          `
           <div style="display:flex;justify-content:space-evenly;  align-items:center; margin-bottom:12px" >
              
              <div style="display:flex;justify-content:flex-start;width:50%;" >
                <span style="width:25%;" >${i?.date}</span>
                <span  style="width:75%;" >${i?.remark}</span>
              </div>
              <div style="display:flex; justify-content:space-evenly;align-items:center; width:50%">
                <span class="debit">${(i?.type === "Debit") ? i?.debit : "-"}</span>
                <span class="credit">${(i?.type === "Credit") ? i?.credit: "-"}</span>
                <span >${i?.type}</span>
                <span>${i?.balance}</span>
              </div>
            </div>
          `
            ).join("")}
        </div>
    </body>
  </html>
`


module.exports = getPdfData
