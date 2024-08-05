import { getComment } from "../../api/osintFetch";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import backIcon from "../../assets/back.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "../../Components/ui/table";
const Details = () => {
  const { id } = useParams();
  const [data, setdata] = useState(null);

  function getClassnameForSeverity(severity) {
    switch (severity) {
      case "low":
        return "text-green-600 m-2 font-semibold"; // Düşük ciddiyet için yeşil renk
      case "medium":
        return "text-yellow-600 m-2 font-semibold"; // Orta ciddiyet için sarı renk
      case "high":
        return "text-orange-600 m-2 font-semibold"; // Yüksek ciddiyet için kırmızı renk
      default:
        return "text-red-600 m-2 font-semibold"; // Varsayılan olarak gri renk
    }
  }

  useEffect(() => {
    const fetchComment = async () => {
      const response = await getComment(id);

      const jsonString = response.message.comment.trim(); // Trim unnecessary whitespace
      const jsonStringR = jsonString.substring(jsonString.indexOf("{"));
      const jsonStringRR = jsonStringR.substring(0, jsonStringR.lastIndexOf("}") + 1);
      const jsonObject = JSON.parse(jsonStringRR);
      setdata(jsonObject);
    };
    fetchComment();
  }, [id]);
  return (
    <>

      {data && (
        <Table className="mt-20 w-4/5 mx-auto text-lg">
          <span className=" absolute top-10 left-20">
            <Link to="/user/dashboard">
              <img src={backIcon} alt="back" className="h-10 w-10" />
            </Link>
          </span>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Report Date</TableCell>
              <TableCell>{data.raport_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold ">Network Information</TableCell>
              <TableCell>
                <ul>
                {data.network_information.map((infos, index) => (
                  <li>
                    <ul>
                      <b>Hostname: </b>{infos.host}
                    </ul>
                    <ul>
                      <b>IP: </b>{infos.ip}
                    </ul>
                    <ul>
                      <b>Ports: </b>
                      {infos.ports.map((port, idx) => (
                        <li key={idx}>{port.number}, {port.protocol}, {port.service}</li>
                      ))}
                    </ul>
                  </li>
                ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold ">Findings</TableCell>
              <TableCell>
                <ul>
                  {Object.entries(data.findings).map(
                    ([severity, findings], index) => (
                      <li key={severity}>
                        <h3 className={getClassnameForSeverity(severity)}>
                          {/* Eğer ciddiyet "none" ise başlığı "None" olarak yazdır */}
                          {severity.charAt(0).toUpperCase() + severity.slice(1)}
                          :
                        </h3>
                        <ul>
                          {findings.map((finding, idx) => (
                            <li key={idx}><b>{finding.name}:</b> {finding.description}</li>
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold ">Recommendations</TableCell>
              <TableCell>
                <ul>
                  {Object.entries(data.findings).map(
                    ([severity, findings], index) => (
                      <li key={severity}>
                        <ul>
                          {findings.map((finding, idx) => (
                            finding.recommendations.map((recommendation, inx) => (
                            <li key={inx}>{recommendation}</li>
                          ))
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold ">Resources</TableCell>
              <TableCell>
                <ul>
                  {Object.entries(data.findings).map(
                    ([severity, findings], index) => (
                      <li key={severity}>
                        <ul>
                          {findings.map((finding, idx) => (
                            finding.resources.map((resource, inx) => (
                            <li key={inx}>{resource}</li>
                          ))
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Details;
