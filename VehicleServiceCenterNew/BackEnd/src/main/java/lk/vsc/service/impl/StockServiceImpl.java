package lk.vsc.service.impl;

import lk.vsc.DTO.CreditPaymentDto;
import lk.vsc.DTO.CustomerPaymentViewDto;
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


            d1.setItemName(ob[1].toString());
            d1.setItemId(ob[0].toString());
            d1.setQtyOnHand(Double.parseDouble(ob[2].toString()));

            d.add(d1);
        }


        return d;
    }

    @Override
    public List<CreditPaymentDto> getCreditPaymentDetails() {

        List<Object[]> creditPayment = stockRepository.getCreditPaymentDetails();

        List<CreditPaymentDto> a1 = new ArrayList<>();

        for ( Object[] c:creditPayment
             ) {

            CreditPaymentDto s = new CreditPaymentDto();
            s.setCompany_name(c[0].toString());
            s.setAgent_name(c[1].toString());
            s.setPhone_number(c[2].toString());
            s.setPayment(Double.parseDouble(c[3].toString()));
            s.setStock_payement_date(c[4].toString());
            s.setCredit_balance(Double.parseDouble(c[5].toString()));
            s.setStockId(Integer.parseInt(c[6].toString()));
            a1.add(s);
        }

        return a1;
    }

    @Override
    public Stock getStockById(int stockId) {
        return stockRepository.getStockById(stockId);

    }

    @Override
    public Stock updateStock(Stock s1) {
        return stockRepository.save(s1);
    }

    @Override
    public List<CustomerPaymentViewDto> getCustomerPaymentDetails() {

        List<Object[]> creditPayment=stockRepository.getCustomerPaymentDetails();

        List<CustomerPaymentViewDto> l1 = new ArrayList<>();
        for (Object []ob:creditPayment) {

            CustomerPaymentViewDto c1 = new CustomerPaymentViewDto();
            c1.setName(ob[0].toString()+" "+ob[1].toString());
            c1.setEmail(ob[2].toString());
            c1.setAddress(ob[3].toString());
            c1.setPhoneNumber(ob[4].toString());
            c1.setVehicleNumber(ob[5].toString());
            c1.setDate(ob[6].toString());
            c1.setAmount(ob[7].toString());
            l1.add(c1);
        }

        if(l1.size()==0){
            return null;
        }else{
            return l1;
        }
    }
}
