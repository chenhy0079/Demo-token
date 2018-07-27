package org.domeos.framework.api.model.restApi;

import java.util.List;

import org.domeos.framework.api.model.deployment.related.HostEnv;

public class HostInfo
{
	private int clusterId;
    private String ostype;
    private HostEnv hostEnv;
    private String dnsName;
    private List<String> lables;
	public int getClusterId()
	{
		return clusterId;
	}
	public void setClusterId(int clusterId)
	{
		this.clusterId = clusterId;
	}
	public String getOstype()
	{
		return ostype;
	}
	public void setOstype(String ostype)
	{
		this.ostype = ostype;
	}
	public HostEnv getHostEnv()
	{
		return hostEnv;
	}
	public void setHostEnv(HostEnv hostEnv)
	{
		this.hostEnv = hostEnv;
	}
	public String getDnsName()
	{
		return dnsName;
	}
	public void setDnsName(String dnsName)
	{
		this.dnsName = dnsName;
	}
	public List<String> getLables()
	{
		return lables;
	}
	public void setLables(List<String> lables)
	{
		this.lables = lables;
	}
}
