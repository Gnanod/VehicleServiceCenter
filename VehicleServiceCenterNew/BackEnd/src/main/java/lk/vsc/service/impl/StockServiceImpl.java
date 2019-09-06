package lk.vsc.service.impl;

import jdk.nashorn.internal.parser.JSONParser;
import lk.vsc.DTO.LowStockLevelDTO;
import lk.vsc.entity.Item;
import lk.vsc.entity.Stock;
import lk.vsc.entity.StockItemDetails;
import lk.vsc.repository.ItemRepository;
import lk.vsc.repository.StockRepository;
import lk.vsc.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private ItemRepository itemRepository;

    @Override
    @Transactional
    public String addStock(Stock stock) {

        Stock s = stockRepository.save(stock);
           if(s!=null){

               Set<StockItemDetails> stockItemDetails = stock.getStockItemDetails();
               for (StockItemDetails s1: stockItemDetails
                    ) {
                   Item i = s1.getItem();
                   System.out.println("GGGGGGGKKKKKKKK"+i.getStockLevel());
                   itemRepository.save(i);
                   System.out.println("OOO"+i.getItemId());
                   System.out.println("PP"+i.getItemName());
                   System.out.println("PP"+i.getQuantityOnHand());
               }
               return "9";

           }else{
               return null;
           }

    }

    @Override
    public List<LowStockLevelDTO> getLowStockLevelReport() {

      List<Object[]> lowStock = stockRepository.getLowStockLevelReport();

        List<LowStockLevelDTO> d = new ArrayList<LowStockLevelDTO>();
        for ( Object ob []: lowStock
             ) {

            LowStockLevelDTO d1 = new LowStockLevelDTO();


            d1.setItemName(ob[0].toString());
            d1.setMakeName(ob[1].toString());
            d1.setModelName(ob[2].toString());
            d1.setQtyOnHand(Double.parseDouble(ob[3].toString()));

            d.add(d1);
        }


        return d;
    }
}
