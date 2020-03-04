package lk.vsc.repository;

import lk.vsc.entity.JobClose;
import lk.vsc.entity.PerformaInvoice;
import lk.vsc.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServicesRepository extends JpaRepository<Services, Integer> {
    @Query(value = "from Services where serviceId=?1")
    Services searchByServicesNumber(int employeeId);

    @Query(value = "select serviceId, serviceName,serviceDesc, vehicletype,servicePrice from Services where vehicletype =:vehicleType")
    List<Object[]> getAllDetails(@Param("vehicleType") String vehicleType);

    @Query(value = "select serviceDesc from Services where serviceDesc like CONCAT('%',:searchByServiceName,'%')")
    List<Object[]> getServiceDesc(@Param("searchByServiceName") String searchByServiceName);

    @Query(value = "from Services where serviceId=?1")
    Services getServicebyId(int serviceId);

    @Query(value = "select serviceId, serviceName,serviceDesc, vehicletype,servicePrice from Services")
    List<Object[]> getAllSerivce();

    //    @Query(value = "" +
//            "select j.date,j.serviceId,j.detailJobAmount,j.lubeJobAmount,j.serviceAmount,j.presentOdoMeter,j.jobID " +
//            "from JobOrder j , Vehicle v where v.vehicleId = j.vehicle.vehicleId and v.vehicleNumber =:vehNumber")
    @Query(value = "" +
            "select fi.date,fi.service_id,fi.total_amount,jo.present_odo_meter,jo.jobid " +
            "from final_invoice fi left join job_order jo ON fi.service_id = jo.service_id " +
            "left join vehicle v ON jo. vehicle_vehicle_id=v.vehicle_id " +
            "where v.vehicle_number=?1",nativeQuery = true)
    List<Object[]> getAllVehicleHistoryByUsingVehNumber( String vehNumber);

    @Query(value = "SELECT service_name FROM services LEFT JOIN service_job_details ON services.service_id = service_job_details.service_id where service_job_id=:serviceID", nativeQuery = true)
    List<Object[]> viewServiceForThisJob(@Param("serviceID") String serviceID);

    @Query(value = "select i.itemId,j.qty,i.itemQuantityType from Item i , JobOrderItemDetails j where i.itemId = j.item.itemId and j.jobOrder.jobID =:jobId")
    List<Object[]> viewItemDetails(@Param("jobId") int jobId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update service_job set job_status=:jobStatus  where service_job_id=:serviceId",nativeQuery = true)
    int reOpenJob(@Param("serviceId")String serviceId,@Param("jobStatus")String newJobStatus);


    @Query(value = "select jo.jobID from JobOrder jo where  jo.serviceId =:serviceId")
    Object getJobOrderId(@Param("serviceId")String serviceId);

    @Query(value = "select j.item.itemId,j.qty from JobOrderItemDetails j where  j.jobOrder.jobID =:jobId ")
    List<Object[]> getItemsAccordingToJobId(@Param("jobId")int jobId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update job_order_item_details set re_open_status='Not Updated'  where job_order_jobid=:jobId and item_item_id =:itemId",nativeQuery = true)
    void updateReopenItemStatus(@Param("itemId")String itemId,@Param("jobId")int jobId);

    @Query(value = " from JobClose j where  j.date >=:fromdate and j.date<=:todate ")
    List<JobClose> searchJobCloseToReport(@Param("fromdate")String fromdate,@Param("todate") String todate);

    @Query(value = " from PerformaInvoice p where  p.date >=:fromdate and p.date<=:todate ")
    List<PerformaInvoice> searchPerformaInvoice(@Param("fromdate")String fromdate, @Param("todate")String todate);

    @Query(value = "select f.serviceId,f.date,f.serviceAmount,f.itemAmount,f.grossAmount,f.serviceDiscount,f.itemDiscount,f.grossDiscount,f.discountedTotalService,f.discountedTotalItems,f.discountedTotalGross,f.totalAmount,f.paymentTypeInvoice from FinalInvoice f where  f.date >=:fromdate and f.date<=:todate ")
    List<Object[]> searchFinalInvoice(@Param("fromdate")String fromdate,@Param("todate") String todate);
//    select service_desc from services where service_name='Wax'


}

