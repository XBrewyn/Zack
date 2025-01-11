import server from './api';

const { DEV_PORT } = process.env;

server.listen(DEV_PORT, () => console.log(`Server running on port ${DEV_PORT}`));
