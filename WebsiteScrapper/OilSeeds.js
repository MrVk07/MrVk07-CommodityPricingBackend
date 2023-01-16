import request from 'request'
import express from "express";
import cheerio from "cheerio"

const OilSeeds = express.Router();
let url = 'https://www.commodityinsightsx.com/commodities/oil-seeds'

let handleHtml = (html) => {
    let OilSeeds = []
    let $ = cheerio.load(html)
    let itemArr = $(".boxContent")
    let OilSeeds_name = $('.boxContent>h4')
    let images = $('.lozad')
    let table_of_content_value = $(".rc")
    for (let i = 0; i < itemArr.length; i++) {
        let data_of_each_item = {}
        data_of_each_item["name"] = OilSeeds_name[i].children[0].data
        data_of_each_item["image"] = images[i].attributes[1].value.includes("default")
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5_8U6-f_tDSw6t2z6AlyNfrDxSAQE8cPRMQ&usqp=CAU"
            : "https://www.commodityinsightsx.com" + images[i].attributes[1].value
        data_of_each_item["Category"] = "Oil Seeds"
        data_of_each_item["Costliest_Market"] = table_of_content_value[7 * i + 2].children[0].data.trim()
        data_of_each_item["Costliest_Market_Price"] = table_of_content_value[7 * i + 3].children[0].data.trim()
        data_of_each_item["Cheapest_Market"] = table_of_content_value[7 * i + 4].children[0].data.trim()
        data_of_each_item["Cheapest_Market_Price"] = table_of_content_value[7 * i + 5].children[0].data.trim()
        data_of_each_item["Latest_Price_Date"] = table_of_content_value[7 * i + 6].children[0].data.trim()
        OilSeeds.push(data_of_each_item)
    }
    return OilSeeds
}

OilSeeds.get('/', async (req, res) => {
    request(url, (error, response, html) => {
        if (error) {
            console.error('error :', error);
        }
        else {
            let data_of_OilSeeds = handleHtml(html)
            res.send(data_of_OilSeeds)
        }
    })
})


export default OilSeeds