# Poll my DHL delivery

https://clientesparcel.dhl.es/LiveTrackingN/ModificarEnvio/2832127124

let's try `curl`

nope

tried looking in dev tools under network XHR

found this:

https://clientesparcel.dhl.es/LiveTrackingN/api/expediciones?numeroExpedicion=2832127124

let's `curl` it

```shell
url https://clientesparcel.dhl.es/LiveTrackingN/api/expediciones?numeroExpedicion=2832127124 | jq
```

specifically

```shell
curl https://clientesparcel.dhl.es/LiveTrackingN/api/expediciones?numeroExpedicion=2832127124 | jq '.Seguimiento'
```

now `watch --help`

```shell
watch --help

Usage:
 watch [options] command

Options:
  -b, --beep             beep if command has a non-zero exit
  -c, --color            interpret ANSI color and style sequences
  -d, --differences[=<permanent>]
                         highlight changes between updates
  -e, --errexit          exit if command has a non-zero exit
  -g, --chgexit          exit when output from command changes
  -n, --interval <secs>  seconds to wait between updates
  -p, --precise          attempt run command in precise intervals
  -t, --no-title         turn off header
  -x, --exec             pass command to exec instead of "sh -c"

 -h, --help     display this help and exit
 -v, --version  output version information and exit

For more details see watch(1).
```

formatting

```shell
curl https://clientesparcel.dhl.es/LiveTrackingN/api/expediciones?numeroExpedicion=2832127124 | jq -r '.Seguimiento[] | .Fecha + " " + .Hora + " " + .Descripcion'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2546  100  2546    0     0   7554      0 --:--:-- --:--:-- --:--:--  7532
12/09/2023 16:24 Entrega concertada con el destinatario
11/09/2023 17:41 Destinatario ausente: no se ha podido realizar la entrega
11/09/2023 13:57 En reparto
11/09/2023 13:35 Llegada a
07/09/2023 20:27 Salida de
```

silent curl

```shell
curl --help
```

```shell
$ curl --help | grep sile
 -f, --fail          Fail silently (no output at all) on HTTP errors
 -s, --silent        Silent mode
```

