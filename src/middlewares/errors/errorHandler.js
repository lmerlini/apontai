const { Log } = require('../../models')
const os = require('os');
module.exports = async function errorHandler(err, req, res, next) {

    //TODO implementar service para logs
    const getMemoryUsage = () => {
        return ((os.totalmem() - os.freemem()) / 1048576).toFixed(2);
    }

    const getCpuModel = () => {
        const cpus = os.cpus();
        return cpus.length ? cpus[0].model : null;
    }

    const systemInfo = {
        freeMemory: os.freemem(),
        memoryUsage: getMemoryUsage(),
        cpuModel: getCpuModel()
    };

    try {
        await Log.create({
            userId: req.user && req.user.id ? req.user.id : null,
            method: req.method,
            queryParams: req.query,
            requestBody: req.body,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            referrer: req.headers.referrer || req.headers.referer,
            errorMessage: err.message,
            stackTrace: err.stack,
            dbQueryDetails: JSON.stringify(global.lastExecutedQuery),
            environment: process.env.NODE_ENV || 'development',
            memoryUsage: systemInfo.memoryUsage || null,
            cpuLoad: systemInfo.cpuModel || null,
            appVersion: process.env.VERSION,            
        });

        res.status(err.status || 500).json({
            message: err.message || 'Um erro inesperado ocorreu.',
            status: 'error'
        });

    } catch (createError) {
        // console.error('Error while logging the error:', createError);
        res.status(500).json({
            message: 'Um erro inesperado ocorreu ao registrar o erro.',
            status: 'error'
        });
    }
};