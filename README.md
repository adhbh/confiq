# confiq

```
// set node env to development
import confiq from 'confiq'

const db = confiq('db')

consol.log(db.host) // gets config from /congig/development and fallbacks to /congig/default
```
