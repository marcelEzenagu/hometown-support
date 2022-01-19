const fs = require('fs');
// Build paths
const { buildPathHtml } = require('./buildPaths');
const path = require('path');
const getUserTransactions = require('../controllers/report/getUserTransactions');

const img = path.resolve("./assets/hometown.jpg")

const createRow = (item) => `
  <tr style="borderBottom: 1px solid black" >
    <td>${item.date}</td>
    <td>${item.reference}</td>
    <td class="debit">${item.debit}</td>
    <td class="credit">${item.credit}</td>
    <td>${item.type}</td>
    <td>${item.balance}</td>
    <td>${item.remark}</td>
  </tr>
`;

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */



const createTable = (rows) => `
  <table >
    <tr id="table-row">
    <th>Date</td>
        <th>Reference</td>
        <th  >Debit</td>
        <th >Credit</td>
        <th>Type</td>
        <th>Balance</td>
        <th>Description</td>
    </tr>
    ${rows}

  </table>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table, img, user) => `
  <html>
    <head>
      <style>
      html {
        -webkit-print-color-adjust: exact;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        tr {
          text-align: left;
          
          
        }
       
        th, td {
          padding: 5px;
          width:60;
          border: 1px solid black;
        }
        #headerLeft {
          width:40%
        }
        #headerRight {
          width:40%;
          margin-left:40px
        }
        header{
          display:flex;
          justify-content:space-between;
          align-items:center;
        }
        img{width:25%}
        #user{
          font-size:18;
        }
        #statement{
          border-bottom: 1px solid black!important;
          font-size:20px;
          text-align:center;
          margin:20px 0px
        }
        .credit{
          background-color:green;
        }
        .debit{
          background-color:blue;
        }
      </style>
    </head>
    <body>
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


          </p>
        </div>
      ${table}


    </body>
  </html>
`;

const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {
		return false;
	}
};



const getData = async(arg) => {
  // const user = await getUserByEmail(arg)
  
  const data = await getUserTransactions(arg);
  try {
    /* Check if the file for `html` build exists in system or not */
    if (doesFileExist(buildPathHtml)) {
      console.log('Deleting old build file');
      /* If the file exists delete the file from system */
      fs.unlinkSync(buildPathHtml);
    }
    /* generate rows */
  
    const rows = data.items.map(createRow).join('');
    const {userDetails} = data

    /* generate table */
    const table = createTable(rows);
    /* generate html */
    const html = createHtml(table, img,userDetails);
    /* write the generated html to file */
    fs.writeFileSync(buildPathHtml, html);
    console.log('Succesfully created an HTML table');
  } catch (error) {
    console.log('Error generating table', error);
  }
}

module.exports = getData

