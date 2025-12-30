export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: 'Not found'
    }
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Mongoose validation
  if (err?.name === 'ValidationError') {
    const fields = Object.fromEntries(
      Object.entries(err.errors ?? {}).map(([key, val]) => [key, val?.message || 'Invalid value'])
    );

    res.status(400).json({
      error: {
        message: 'Validation failed',
        fields
      }
    });
    return;
  }

  // Mongoose duplicate key (unique index)
  if (err?.code === 11000) {
    res.status(409).json({
      error: {
        message: 'Duplicate key'
      }
    });
    return;
  }

  const status = err.statusCode || err.status || 500;

  if (process.env.NODE_ENV !== 'production') {
    // Keep error helpful during dev
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    error: {
      message: status === 500 ? 'Internal server error' : err.message
    }
  });
}
