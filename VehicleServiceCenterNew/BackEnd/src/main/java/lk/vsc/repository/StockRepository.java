package lk.vsc.repository;

import lk.vsc.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock,Integer> {

//    @Query(value = "select i.itemName,mm.makeName,mm.modelName,i.quantityOnHand from Item i , MakeModelDetails m , MakeModel mm where i.itemId = m.item.itemId and mm.makeModelId= m.makeModel.makeModelId and i.quantityOnHand< m.stockLevel ")
//    @Query(value ="select i.itemId,i.itemName,m.makeName,m.modelName,i.quantityOnHand from Item i,MakeModel m, MakeModelDetails mm   where i.itemId = mm.item.itemId and m.makeModelId = mm.makeModel.makeModelId and i.quantityOnHand < i.stockLevel")
    @Query(value ="select i.itemId,i.itemName,i.quantityOnHand from Item i where  i.quantityOnHand < i.stockLevel")
    List<Object[]> getLowStockLevelReport();

    @Query(value ="select c.companyName,c.agentName,c.phoneNumber,s.finalDiscountedTotal,s.stockPayementDate,s.creditBalance,s.stockId from Stock s,Supplier c  where c.supplierId= s.supplier.supplierId and s.paymentType='Credit Payment'")
    List<Object[]> getCreditPaymentDetails();

    @Query(value = "from Stock where stockId=?1")
    Stock getStockById(int stockId);

    @Query(value = "select c.firstName,c.lastName,c.email,c.address,c.phoneNumber,v.vehicleNumber,j.date,j.creditBalance from JobOrder j,Customer c,Vehicle v where v.customer.nic= c.nic and j.vehicle.vehicleId= v.vehicleId and j.paymentType='Credit Payment'")
    List<Object[]> getCustomerPaymentDetails();
}
