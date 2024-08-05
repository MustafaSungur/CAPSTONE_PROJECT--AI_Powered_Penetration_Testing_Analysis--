import { runTool } from "../libs/docker.js";
import { runNmap, runTheHarvester, runNuclei } from "../libs/tools.js";
import {
  saveOutputRepo,
  saveOutputIdToUrl,
} from "../repository/osintRepository.js";
import { startAnalisis } from "../services/commentService.js";

export async function runOsintScan({ parseUrl, saveUrl }) {
  console.log(parseUrl);

  /*const [nmap, theharvester, nuclei] = await Promise.all([
    runTool("instrumentisto/nmap", ["-A", "-T4", parseUrl.host]),
    runTool("secsi/theharvester", ["-d", parseUrl.host, "-b", "all"]),
    runTool("projectdiscovery/nuclei", ["-target", parseUrl.origin]),
  ]);*/

  const [nmap, theharvester, nuclei] = await Promise.all([
    runNmap("-A -T4 " + parseUrl.host),
    runTheHarvester("-d " + parseUrl.host + " -b all"),
    runNuclei("-target " + parseUrl.origin),
  ]);

  const output =
    "\n#####\n\n PENETRATİON TEST RESULT: \n\n NMAP:" +
    nmap +
    "\n\nTHEHARVESTER:\n" +
    theharvester +
    " \n#####\n\n" +
    "\n\nNUCLEI:\n" +
    nuclei +
    " \n#####\n\n";

  console.log(output);

  const saveOutput = await saveOutputRepo(output);
  const changeUrl = await saveOutputIdToUrl({
    url: saveUrl,
    output: saveOutput,
  });

  const prompt =
    "Your task is to come up with the given penetration and analyze it. It returns json format according to the Report template and keys given below. Give me data in {}" +
    output +
    `#####REPORTİNG TAMPLATE:REPORTING_TEMPLATE: {
  "raport_date": ,
  "network_information":[
    {
      "host": "www.leaderos.net",
      "ip": "104.21.55.49",
      "ports": [
        {
          "number": 80,
          "protocol": "tcp",
          "state": "open",
          "service": "http",
          "version": "Cloudflare http proxy"
        }
      ]
    }
  ],
  "findings": {
    "critical": [
       {
        "name": "Self-Signed SSL Certificate",
        "description": "The SSL certificate on the target system is self-signed, which may indicate that the server is not trusted.",
        "severity": "critical",
        "recommendations": [
          "Replace the self-signed SSL certificate with a certificate from a trusted certificate authority."
        ],
        "resources": ["Give me owasp based resource only one url"]
      },
    ],
    "high":[
        {
        "name": "Self-Signed SSL Certificate",
        "description": "The SSL certificate on the target system is self-signed, which may indicate that the server is not trusted.",
        "severity": "high",
        "recommendations": [
          "Replace the self-signed SSL certificate with a certificate from a trusted certificate authority."
        ],
        "resources": ["Give me owasp based resource only one url"]

      },
    ],
    "medium": [
       {
        "name": "Self-Signed SSL Certificate",
        "description": "The SSL certificate on the target system is self-signed, which may indicate that the server is not trusted.",
        "severity": "medium",
        "recommendations": [
          "Replace the self-signed SSL certificate with a certificate from a trusted certificate authority."
        ],
        "resources": ["Give me owasp based resource only one url"]
      },
    ],
    "low": [
       {
        "name": "Self-Signed SSL Certificate",
        "description": "The SSL certificate on the target system is self-signed, which may indicate that the server is not trusted.",
        "severity": "low",
        "recommendations": [
          "Replace the self-signed SSL certificate with a certificate from a trusted certificate authority."
        ],
        "resources": ["Give me owasp based resource only one url"]
      },
    ]
  },



}#####`;

  startAnalisis(prompt, changeUrl);
}
