package lk.vsc.controller;


import lk.vsc.DTO.CreditPaymentDto;
import lk.vsc.DTO.LowStockLevelDTO;
import lk.vsc.entity.Stock;
import lk.vsc.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/StockController")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping(value = "/addStock")
    public String addStock(@RequestBody Stock stock){


        return  stockService.addStock(stock);

    }

    @GetMapping(value = "/getLowStockLevelReport")
    public List<LowStockLevelDTO> getItems(){
        System.out.println("stock Level");
        return stockService.getLowStockLevelReport();
    }

    @GetMapping(value = "/getCreditPaymentDetails")
    public List<CreditPaymentDto> getCreditPaymentDetails(){

        return stockService.getCreditPaymentDetails();
    }



    @PostMapping(value = "/updateStockPayments")
    public String updateStockPayments(@RequestBody CreditPaymentDto stock){


        int stockId = stock.getStockId();
        Stock s1 = stockService.getStockById(stockId);
        s1.setDate(stock.getStock_payement_date());
        s1.setCreditBalance(stock.getCredit_balance());
        s1.setPaymentType(stock.getPaymentType());
        s1.setPayment(stock.getPayment());

        Stock s= stockService.updateStock(s1);

        if(s!=null){
            return "0";
        }else{
            return null;
        }

    }
}


