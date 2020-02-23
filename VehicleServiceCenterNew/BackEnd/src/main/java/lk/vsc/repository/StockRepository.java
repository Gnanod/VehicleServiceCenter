package lk.vsc.repository;

import lk.vsc.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
//
//    @Query(value = "" +
//            "select c.first_name,c.last_name,c.email,fi.service_id,c.phone_number,v.vehicle_number," +
//            " fi.date,fi.total_amount-sum(fip.payment)" +
//            " from final_invoice fi " +
//            " left join job_order jo ON fi.service_id = jo.service_id " +
//            " left join final_invoice_payment fip On fi.final_invoice_id = fip.final_invoice_final_invoice_id " +
//            " left join vehicle v ON jo. vehicle_vehicle_id=v.vehicle_id " +
//            " left join customer c  ON v.customer_nic = c.nic  " +
//            "where payment_type_invoice='Credit Payment'" +
//            " group By fip.final_invoice_final_invoice_id,fip.payment",nativeQuery = true)

    @Query(value="select c.first_name,c.last_name,c.email,fi.service_id,c.phone_number,v.vehicle_number, " +
            "fi.date,fi.total_amount-sum(fip.payment) " +
            "from final_invoice fi " +
            "left join job_order jo ON fi.service_id = jo.service_id " +
            "left join final_invoice_payment fip On fi.final_invoice_id = fip.final_invoice_final_invoice_id " +
            "left join vehicle v ON jo. vehicle_vehicle_id=v.vehicle_id " +
            "left join customer c  ON v.customer_nic = c.nic " +
            "where payment_type_invoice='Credit Payment' " +
            "group By fip.final_invoice_final_invoice_id,fip.payment, " +
            "c.first_name, c.last_name, c.email,fi.service_id,c.phone_number, " +
            "v.vehicle_number,fi.date, fi.total_amount",nativeQuery = true)
    List<Object[]> getCustomerPaymentDetails();

    @Query(value = "" +
            "select  s.service_name,s.service_desc,s.service_price,sjd.servicedetailsid,s.service_id " +
            "from service_job_details sjd left join services s ON sjd.service_id = s.service_id " +
            "left join service_job sj On sjd.service_job_id = sj.service_job_id " +
            "where sjd.service_job_id=:serviceId and sj.job_status='Job Open' and sjd.job_status='Yes' ",nativeQuery = true)
    List<Object[]> getServiceDetailsByServiceId(@Param("serviceId")String serviceId);

    @Query(value = " " +
            "select i.item_id,i.item_name,i.item_quantity_type,i.quantity_of_price,joid.qty,joid.lube_job_type," +
            "joid.job_order_service_details,joid.make,joid.model,joid.price " +
            "from job_order_item_details joid left join item i On joid.item_item_id=i.item_id " +
            "left join job_order jo On jo.jobid=joid.job_order_jobid " +
            "left join service_job sj On jo.service_id = sj.service_job_id " +
            "where jo.service_id=:serviceId and sj.job_status='Job Open' and joid.item_status='Yes' ",nativeQuery = true)
    List<Object[]> getItemDetailsByServiceId(@Param("serviceId")String serviceId);


    @Query(value = "" +
            "select  s.service_name,s.service_desc,s.service_price,sjd.servicedetailsid,s.service_id " +
            "from service_job_details sjd left join services s ON sjd.service_id = s.service_id " +
            "left join service_job sj On sjd.service_job_id = sj.service_job_id " +
            "where sjd.service_job_id=:serviceId and sj.job_status='Job Closed' and sjd.job_status='Yes'",nativeQuery = true)
    List<Object[]> getServiceDetailsByServiceIdToPerformaInvoice(@Param("serviceId")String id);

    @Query(value = "" +
            "select i.item_id,i.item_name,i.item_quantity_type,i.quantity_of_price,joid.qty,joid.lube_job_type," +
            "joid.job_order_service_details,joid.make,joid.model,joid.price " +
            "from job_order_item_details joid left join item i On joid.item_item_id=i.item_id " +
            "left join job_order jo On jo.jobid=joid.job_order_jobid " +
            "left join service_job sj On jo.service_id = sj.service_job_id " +
            "where jo.service_id=:serviceId and sj.job_status='Job Closed' and joid.item_status='Yes' ",nativeQuery = true)
    List<Object[]> getItemDetailsByServiceIdToPerformaInvoice(@Param("serviceId")String id);
}
