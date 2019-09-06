package lk.vsc.controller;


import lk.vsc.DTO.LowStockLevelDTO;
import lk.vsc.entity.Item;
import lk.vsc.entity.MakeModelDetails;
import lk.vsc.entity.Stock;
import lk.vsc.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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


}


