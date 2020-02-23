package lk.vsc.service;

import lk.vsc.DTO.FinalJobCloseDTO;
import lk.vsc.entity.*;

import java.util.List;

public interface JobOrderService {

    List<Item> getItemsForJobOrder(String itemName, String makeName, String modelName);

    Item searchUnitPrice(String itemName);

    String setJobOrder(JobOrder j1);

    double getTotalSales();

    double getTodayJobCount();

    double getMonthlyTotalSales();

    String[] getDetailsAccordingToServiceId(String id);

    JobOrder serchPreviousJobs(String vehicleId);

    String printJobOrder(PrintJobOrder j1);

    JobOrderItemDetails getJobOrderDetailsAccordingToId(int id);

    String saveJobClose(FinalJobCloseDTO jobClose);

    JobClose searchServiceAndItemDetailsAmountByServiceId(String serviceId);

    String[] getDetailsAccordingToServiceIdReOpen(String id);
}
