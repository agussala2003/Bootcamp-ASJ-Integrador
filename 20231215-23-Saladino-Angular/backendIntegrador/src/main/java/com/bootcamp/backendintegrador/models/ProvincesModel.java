package com.bootcamp.backendintegrador.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "provinces")
public class ProvincesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Province name is required")
    @NotBlank(message = "Province name must be complete")
    @Column(name = "province_name", nullable = false)
    private String provinceName;

    @NotNull(message = "Country ID is required")
    @Column(name = "country_id", nullable = false)
    private Integer countryId;

    public ProvincesModel() {

    }

    public ProvincesModel(Integer id,
            String provinceName,
            Integer countryId) {
        this.id = id;
        this.provinceName = provinceName;
        this.countryId = countryId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }
}
