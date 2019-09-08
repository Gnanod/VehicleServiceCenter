package lk.vsc.service;

import lk.vsc.entity.Item;
import lk.vsc.entity.JobOrder;

import java.util.List;

public interface JobOrderService {
    List<Item> getItemsForJobOrder(String itemName, String makeName, String modelName);

    Item searchUnitPrice(String itemName);

    String setJobOrder(JobOrder j1);

    double getTotalSales();

    double getTodayJobCount();

    double getMonthlyTotalSales();
}
