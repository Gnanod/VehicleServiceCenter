package lk.vsc.service;

import lk.vsc.DTO.CreditPaymentDto;
import lk.vsc.DTO.CustomerPaymentViewDto;
import lk.vsc.DTO.JobCloseDTO;
import lk.vsc.DTO.LowStockLevelDTO;
import lk.vsc.entity.Stock;

import java.util.List;

public interface StockService {

    String addStock(Stock stock);

    List<LowStockLevelDTO> getLowStockLevelReport();

    List<CreditPaymentDto> getCreditPaymentDetails();

    Stock getStockById(int stockId);

    Stock updateStock(Stock s1);

    List<CustomerPaymentViewDto> getCustomerPaymentDetails();


    JobCloseDTO searchServiceAndItemDetailsBtServiceId(String serviceId);

    JobCloseDTO searchServiceAndItemDetailsBtServiceIdToPerformaInvoice(String serviceId);
}
