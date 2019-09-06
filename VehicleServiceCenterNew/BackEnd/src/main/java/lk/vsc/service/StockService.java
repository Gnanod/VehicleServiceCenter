package lk.vsc.service;

import lk.vsc.DTO.LowStockLevelDTO;
import lk.vsc.entity.Item;
import lk.vsc.entity.Stock;

import java.util.List;

public interface StockService {

   String addStock(Stock stock);

    List<LowStockLevelDTO> getLowStockLevelReport();
}
