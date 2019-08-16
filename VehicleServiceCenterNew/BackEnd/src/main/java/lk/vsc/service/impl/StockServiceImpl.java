package lk.vsc.service.impl;

import jdk.nashorn.internal.parser.JSONParser;
import lk.vsc.entity.Item;
import lk.vsc.entity.Stock;
import lk.vsc.repository.StockRepository;
import lk.vsc.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Override
    @Transactional
    public String addStock(Stock stock) {

        Stock s = stockRepository.save(stock);
           if(s!=null){

               return "9";
           }else{
               return null;
           }

    }
}
