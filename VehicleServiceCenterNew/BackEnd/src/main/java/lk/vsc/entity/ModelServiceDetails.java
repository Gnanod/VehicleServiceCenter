package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class ModelServiceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int modelServiceId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MakeModel makeModel;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Services services;




    public int getModelServiceId() {
        return modelServiceId;
    }

    public void setModelServiceId(int modelServiceId) {
        this.modelServiceId = modelServiceId;
    }

    public MakeModel getMakeModel() {
        return makeModel;
    }

    public void setMakeModel(MakeModel makeModel) {
        this.makeModel = makeModel;
    }

    public Services getServices() {
        return services;
    }

    public void setServices(Services services) {
        this.services = services;
    }
}
