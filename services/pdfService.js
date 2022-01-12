const pdfKit = require('pdfkit')
const fs = require('fs')
const moment = require('moment')


const createAccountStatement = (statement, path) => {
	let doc = new pdfKit({ margin: 50 });
	generateHeader(doc);
	generateCustomerInformation(doc, statement);
	generateStatementTable(doc, statement);
	generateFooter(doc);
	doc.end();
	doc.pipe(fs.createWriteStream(path));
}

const generateHeader = (doc)=> {
    doc
    // .fontSize(20)
    // .fillColor('blue')
    // .text("HOMETOWN FINTECH LIMITED",{align:'center'})
    // .moveDown(2)
    .fontSize(10)
        .fillColor('#444444')
		.text('Blossom House, Last Floor', 50, 65, { align: 'left' })
		.text('DBS Road, Asaba,', 50, 80, { align: 'left' })
		.text('Delta State, Nigeria', 50, 95, { align: 'left' })
	    .image('assets/hometown.jpg',200,0,{fit: [250,300],  align:'center'})
		.fillColor('#444444')
        .fontSize(10)
		.text('1662509', 200, 65, { align: 'right' })
		.text('connect@gethometown.app', 200, 80, { align: 'right' })
		.text('www.gethometown.app', 200, 95, { align: 'right' })
		.moveDown();
}

const generateFooter = (doc) => {
	doc.fontSize(
		10,
	).text(
		'Payment is due within 15 days. Thank you for your business.',
		50,
		780,
		{ align: 'center', width: 500 },
	);
}


const generateCustomerInformation = (doc, invoice) => {
	const shipping = invoice.user;

	doc
    // .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
		.text(`Invoice Date: ${moment(new Date()).format("YYYY-MM-DD")}`, 50, 120)
		// .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)

		.text(shipping, 50, 130)
		// .text(shipping.address, 300, 215)
		// .text(
		// 	`${shipping.city}, ${shipping.state}, ${shipping.country}`,
		// 	300,
		// 	130,
		// )
		.moveDown();
}



const generateTableRow = (doc, y, c1, c2, c3, c4, c5, c6) => {
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 120, y , { width: 200, align: 'left' })
		.text(c3, 260, y, { width: 90, align: 'right' })
		.text(c4, 320, y, { width: 90, align: 'right' })
		.text(c5, 380, y, { width: 90, align: 'right' })
		.text(c6, 0, y, { align: 'right' });
}



const generateStatementTable = (doc, invoice) => {
	let i,
		invoiceTableTop = 130;

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		if(invoice.items.length == 18){
			doc.addPage()
		}
		generateTableRow(
			doc,
			position,
			item.transDate,
			item.remark,
			item.debit,
			item.credit,
			item.type,
			item.balance,
			item.reference,
		);
	}
}
// let rightHeader = {Email:"connect@gethometown.app",
//                     Web: "www.gethometown.app",
//                 RC:"1662509",
//                 TIN: "22391275-0001"}
// let leftHeader = "Blossom House, Last Floor, DBS Road, Asaba, Delta State, Nigeria"
// const generatePdf = (details, dataCallback, endCallback) => {
//     let doc = new pdfKit()
//     doc.on("data", dataCallback);
//     doc.on("end", endCallback);
//     // doc.fontSize(20);

//     doc.font("Times-Bold").text("HOMETOWN FINTECH LIMITED",{align:"center"})
//     doc.moveDown()
//     doc.moveDown()
//     // doc.fontSize(12)
//     doc.text("Tel:",{align:"right"})
//     doc.text("+234 8031230668",{align:"right"})
//     doc.text("+234 9056097944",{align:"right"})
//     // 
//     doc.text("Print Date:",50,100 )
//     doc.text(new Date(),100, 150)
//     doc.moveDown()

    // working with data from db
    // details.forEach(item => {
    //     doc.font("Times-Roman")
    //     doc.fontSize(12)
    //     doc.text(item.transDate)
    //     doc.text(item.remark)
    //     doc.text(item.debit)
    //     doc.text(item.type)
    //     doc.text(item.credit)
    //     doc.text(item.balance)
    //     doc.text(item.reference)
    //     doc.moveDown(1)
    // })
    // doc.end()
// }

module.exports = createAccountStatement

