package lk.vsc.controller;


import lk.vsc.DTO.CreditPaymentDto;
import lk.vsc.DTO.CustomerPaymentViewDto;
import lk.vsc.DTO.LowStockLevelDTO;
import lk.vsc.DTO.MonthlyOutComeReport;
import lk.vsc.entity.Stock;
import lk.vsc.entity.StockPayment;
import lk.vsc.service.StockPaymentService;
import lk.vsc.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/StockController")
public class StockController {

    @Autowired
    private StockService stockService;
    @Autowired
    private StockPaymentService stockPaymentService;

    @PostMapping(value = "/addStock")
    public String addStock(@RequestBody Stock stock) {


        return stockService.addStock(stock);

    }

    @GetMapping(value = "/getLowStockLevelReport")
    public List<LowStockLevelDTO> getItems() {
        System.out.println("stock Level");
        return stockService.getLowStockLevelReport();
    }

    @GetMapping(value = "/getCreditPaymentDetails")
    public List<CreditPaymentDto> getCreditPaymentDetails() {

        return stockService.getCreditPaymentDetails();
    }


    @PostMapping(value = "/updateStockPayments")
    public String updateStockPayments(@RequestBody CreditPaymentDto stock) {


        int stockId = stock.getStockId();
        Stock s1 = stockService.getStockById(stockId);
//        s1.setDate(stock.getStock_payement_date());
        s1.setCreditBalance(stock.getCredit_balance());
        s1.setPaymentType(stock.getPaymentType());
//        s1.setPayment(stock.getPayment());

        StockPayment p1 = new StockPayment();
        p1.setPayment(stock.getPayment());
        p1.setStock(s1);

        List<StockPayment> sp = new ArrayList<>();
        sp.add(p1);
        System.out.println("Size"+sp.size());

       // s1.setStockPayment(sp);
        String s = stockService.addStock(s1);

        if (s != null) {

            stockPaymentService.addPayment(p1);
            return "0";
        } else {
            return null;
        }

    }


    @GetMapping(value = "/getCustomerPaymentDetails")
    public List<CustomerPaymentViewDto> getCustomerPaymentDetails() {

        return stockService.getCustomerPaymentDetails();
    }

    @GetMapping(value = "/getMonthlyTotalOutCome")
    public double getMonthlyTotalOutCome() {

        return stockPaymentService.getMonthlyTotalOutCome();
    }

    @GetMapping(value = "/getTodayTotalOutCome")
    public double getTodayTotalOutCome() {

        return stockPaymentService.getTodayTotalOutCome();
    }

    @GetMapping(value = "/getMonthlyOutCome")
    public List<MonthlyOutComeReport> getMonthlyOutCome() {

        return stockPaymentService.getMonthlyOutCome();
    }
}


